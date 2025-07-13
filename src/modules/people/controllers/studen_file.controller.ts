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
  @ApiConsumes('multipart/form-data', 'application/json')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
          description: 'Archivo a subir (opcional)',
        },
        url: {
          type: 'string',
          description: 'URL del enlace (opcional)',
        },
        title: {
          type: 'string',
          description: 'Título del enlace (opcional)',
        },
        projectId: {
          type: 'integer',
          description: 'ID del proyecto (requerido)',
        },
      },
      required: ['projectId'],
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

    const results: Array<{ type: string; message: string; data: any }> = [];

    // Si hay un archivo, procesar como archivo
    if (file) {
      const projectFile = this.projectFileRepository.create({
        url: file.path,
        public_id: file.filename,
        format: file.mimetype,
        bytes: file.size,
        type: 'file',
        people: people,
        project: project,
      });
      await this.projectFileRepository.save(projectFile);
      results.push({
        type: 'file',
        message: 'Archivo subido correctamente',
        data: projectFile,
      });
    }

    // Si hay URL, procesar como enlace
    if (body.url) {
      const projectLink = this.projectFileRepository.create({
        url: body.url,
        type: 'link',
        people: people,
        project: project,
      });
      await this.projectFileRepository.save(projectLink);
      results.push({
        type: 'link',
        message: 'Enlace guardado correctamente',
        data: projectLink,
      });
    }

    // Si no se proporcionó ni archivo ni URL, lanzar error
    if (results.length === 0) {
      throw new BadRequestException('Debe proporcionar al menos un archivo o una URL.');
    }

    // Retornar resultado apropiado
    if (results.length === 1) {
      const result = results[0];
      return {
        message: result.message,
        [result.type === 'file' ? 'file' : 'link']: result.data,
      };
    } else {
      // Si se subieron ambos (archivo y enlace)
      return {
        message: 'Archivo y enlace guardados correctamente',
        file: results.find(r => r.type === 'file')?.data,
        link: results.find(r => r.type === 'link')?.data,
      };
    }
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

    // Buscar todos los archivos y enlaces subidos por el usuario, incluyendo el proyecto
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
          links: [],
        });
      }
      
      const fileData = {
        id: file.id,
        url: file.url,
        type: file.type,
        created_at: file.created_at,
      };

      if (file.type === 'link') {
        projectsMap.get(projectId).links.push(fileData);
      } else {
        fileData['public_id'] = file.public_id;
        fileData['format'] = file.format;
        fileData['bytes'] = file.bytes;
        projectsMap.get(projectId).files.push(fileData);
      }
    });

    // Solo proyectos con archivos
    const projectsWithFiles = Array.from(projectsMap.values());

    return {
      message: 'Proyectos con archivos y enlaces',
      projects: projectsWithFiles,
    };
  }
}