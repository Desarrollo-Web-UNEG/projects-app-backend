import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { People } from '@people/entities/people.entity';
import { AdminService, ProfileService } from '@people/services';
import { AuthController } from '@people/controllers/auth.controller';
import { ProfileController } from '@people/controllers/profile.controller';
import { AdminController } from '@people/controllers/admin.controller';
import { AuthService } from '@people/services';
import { StudenFileController } from '@people/controllers/studen_file.controller';
import { ProjectFile } from '@people/entities/project-file.entity';
import { Project } from '../project/entities/project.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([People]),
    TypeOrmModule.forFeature([ProjectFile]),
    TypeOrmModule.forFeature([Project]),
  ],
  controllers: [AuthController, ProfileController, AdminController, StudenFileController],
  providers: [AuthService, ProfileService, AdminService],
  exports: [AuthService, ProfileService, AdminService],
})
export class PeopleModule {}
