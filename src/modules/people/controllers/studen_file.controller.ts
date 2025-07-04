import { Controller, Post, UploadedFile, UseGuards, UseInterceptors, Request, Get } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '@auth/guards/jwt-auth.guard';
import { ApiTags, ApiBearerAuth, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from 'src/config/cloudinary.config';

@ApiTags('People (Profile)')
@ApiBearerAuth()
@Controller('student/file')
export class StudenFileController {
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
      },
    },
  })
  async uploadFile(@UploadedFile() file: any, @Request() req) {
    if (!(req.user as any)?.id) {
      throw new Error('Usuario no autenticado o sin id.');
    }
    return {
      message: 'Archivo subido correctamente',
      url: file.path,
      public_id: file.filename,
      user: (req.user as any).id,
    };
  }

  @Get('list')
  @UseGuards(JwtAuthGuard)
  async listFiles(@Request() req) {
    if (!(req.user as any)?.id) {
      throw new Error('Usuario no autenticado o sin id.');
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
}