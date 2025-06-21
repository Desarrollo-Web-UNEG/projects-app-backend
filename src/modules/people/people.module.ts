import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { People } from '@people/entities/people.entity';
import { AdminService, ProfileService } from '@people/services';
import { AuthController } from '@people/controllers/auth.controller';
import { ProfileController } from '@people/controllers/profile.controller';
import { AdminController } from '@people/controllers/admin.controller';
import { AuthService } from '@people/services';

@Module({
  imports: [TypeOrmModule.forFeature([People])],
  controllers: [AuthController, ProfileController, AdminController],
  providers: [AuthService, ProfileService, AdminService],
  exports: [AuthService, ProfileService, AdminService],
})
export class PeopleModule {}
