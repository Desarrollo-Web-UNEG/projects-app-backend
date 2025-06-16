import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController, ProfileController, AdminController } from './controllers';
import { AuthService, ProfileService, AdminService } from './services';
import { People } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([People])],
  controllers: [AuthController, ProfileController, AdminController],
  providers: [AuthService, ProfileService, AdminService],
  exports: [AuthService, ProfileService, AdminService],
})
export class PeopleModule {}
