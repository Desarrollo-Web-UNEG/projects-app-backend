import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { People } from './entities/people.entity';
import { AdminService, ProfileService } from './services';
import { AuthController } from './controllers/auth.controller';
import { ProfileController } from './controllers/profile.controller';
import { AdminController } from './controllers/admin.controller';
import { AuthService } from './services/auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([People])],
  controllers: [AuthController, ProfileController, AdminController],
  providers: [AuthService, ProfileService, AdminService],
  exports: [AuthService, ProfileService, AdminService],
})
export class PeopleModule {}
