import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentsService } from '@/modules/comments/service/comments.service';
import { CommentsController } from '@/modules/comments/controller/comments.controller';
import { Comments } from '@/modules/comments/entities/comments.entity';

/**
 * Módulo Comments
 * Este módulo gestiona toda la lógica relacionada con los comentarios.
 * Incluye la configuración de la base de datos, los servicios y los controladores.
 */
@Module({
  // Importa TypeOrmModule.forFeature para registrar la entidad Comments con TypeORM.
  // Esto permite que el repositorio de Comments sea inyectable en los servicios.
  imports: [TypeOrmModule.forFeature([Comments])],
  // Define los proveedores (servicios) que estarán disponibles dentro de este módulo.
  providers: [CommentsService],
  // Define los controladores que manejarán las rutas y las solicitudes HTTP para los comentarios.
  controllers: [CommentsController],
})
export class CommentsModule {}
