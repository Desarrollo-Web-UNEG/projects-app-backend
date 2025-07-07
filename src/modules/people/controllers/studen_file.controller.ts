import { Controller, Post, UploadedFile, UseGuards, UseInterceptors, Request, Get, Body } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '@auth/guards/jwt-auth.guard';
import { ApiTags, ApiBearerAuth, ApiConsumes, ApiBody, ApiUnauthorizedResponse, ApiNotFoundResponse, ApiBadRequestResponse } from '@nestjs/swagger';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from 'src/config/cloudinary.config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProjectFile } from '@people/entities/project-file.entity';
import { Project } from '@/modules/project/entities/project.entity';
import { People } from '@people/entities/people.entity';
import { NotFoundException, UnauthorizedException, BadRequestException } from '@nestjs/common';

@ApiTags('People (Profile)')
@ApiBearerAuth()
@Controller('student/file')
export class StudenFileController {
  constructor(
    @InjectRepository(ProjectFile)
    private readonly projectFileRepository: Repository<ProjectFile>,
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    @InjectRepository(People)
    private readonly peopleRepository: Repository<People>,
  ) {}

  @Post('upload')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: new CloudinaryStorage({
        cloudinary: cloudinary,
        params: async (req, file) => {
          const userId = (req.user as any).id;
          return {
            folder: `students/${userId}`,
            resource_type: 'auto',
            public_id: file.originalname.split('.')[0],
          };
        },
      }),
      fileFilter: (req, file, cb) => {
        const allowedTypes = [
          'application/pdf',
          'application/msword',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          'application/zip',
          'application/x-rar-compressed',
          'image/png',
          'image/jpeg',
        ];
        if (allowedTypes.includes(file.mimetype)) {
          cb(null, true);
        } else {
          cb(new Error('Tipo de archivo no permitido'), false);
        }
      },
      limits: { fileSize: 10 * 1024 * 1024 },
    })
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
        projectId: {
          type: 'integer',
          description: 'ID del proyecto al que pertenece el archivo',
        },
      },
      required: ['file', 'projectId'],
    },
  })
  @ApiUnauthorizedResponse({ description: 'Usuario no autenticado o sin id.' })
  @ApiBadRequestResponse({ description: 'Debe especificar el ID del proyecto.' })
  @ApiNotFoundResponse({ description: 'Usuario o proyecto no encontrado.' })
  async uploadFile(@UploadedFile() file: any, @Request() req, @Body() body: any) {
    if (!(req.user as any)?.id) {
      throw new UnauthorizedException('Usuario no autenticado o sin id.');
    }
    const userId = (req.user as any).id;
    const projectId = body.projectId;
    if (!projectId) {
      throw new BadRequestException('Debe especificar el ID del proyecto.');
    }
    const people = await this.peopleRepository.findOne({ where: { id: userId } });
    if (!people) {
      throw new NotFoundException('Usuario no encontrado.');
    }
    const project = await this.projectRepository.findOne({ where: { id: projectId } });
    if (!project) {
      throw new NotFoundException('Proyecto no encontrado.');
    }
    const projectFile = this.projectFileRepository.create({
      url: file.path,
      public_id: file.filename,
      format: file.mimetype,
      bytes: file.size,
      people: people,
      project: project,
    });
    await this.projectFileRepository.save(projectFile);
    return {
      message: 'Archivo subido correctamente',
      file: projectFile,
    };
  }

  @Get('list')
  @UseGuards(JwtAuthGuard)
  @ApiUnauthorizedResponse({ description: 'Usuario no autenticado o sin id.' })
  async listFiles(@Request() req) {
    if (!(req.user as any)?.id) {
      throw new UnauthorizedException('Usuario no autenticado o sin id.');
    }
    const userId = (req.user as any).id;
    // Buscar archivos en la carpeta del usuario en Cloudinary
    const result = await cloudinary.search
      .expression(`folder:students/${userId}`)
      .sort_by('created_at','desc')
      .max_results(30)
      .execute();
    return {
      files: result.resources.map((file: any) => ({
        url: file.secure_url,
        public_id: file.public_id,
        format: file.format,
        created_at: file.created_at,
        bytes: file.bytes,
      })),
      total: result.total_count,
    };
  }

  @Get('projectsfiles')
  @UseGuards(JwtAuthGuard)
  @ApiUnauthorizedResponse({ description: 'Usuario no autenticado o sin id.' })
  async getProjectsWithFiles(@Request() req) {
    if (!(req.user as any)?.id) {
      throw new UnauthorizedException('Usuario no autenticado o sin id.');
    }
    const userId = (req.user as any).id;

    // Buscar todos los archivos subidos por el usuario, incluyendo el proyecto
    const files = await this.projectFileRepository.find({
      where: { people: { id: userId } },
      relations: ['project'],
    });

    // Agrupar por proyecto
    const projectsMap = new Map();
    files.forEach(file => {
      const projectId = file.project.id;
      if (!projectsMap.has(projectId)) {
        projectsMap.set(projectId, {
          project: file.project,
          files: [],
        });
      }
      projectsMap.get(projectId).files.push({
        id: file.id,
        url: file.url,
        public_id: file.public_id,
        format: file.format,
        bytes: file.bytes,
        created_at: file.created_at,
      });
    });

    // Solo proyectos con archivos
    const projectsWithFiles = Array.from(projectsMap.values());

    return {
      message: 'Proyectos con archivos subidos',
      projects: projectsWithFiles,
    };
  }
}