import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  UseGuards,
  Request,
  Put,
  Delete,
} from '@nestjs/common';
import { PeopleService } from './people.service';
import { RegisterPeopleDto, UpdatePeopleDto } from './dto/register-people.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserType } from './people.entity';

@Controller('people')
export class PeopleController {
  constructor(private readonly peopleService: PeopleService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterPeopleDto) {
    return this.peopleService.register(registerDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserType.ADMIN)
  @Get('pending')
  async getPendingUsers() {
    return this.peopleService.getPendingUsers();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserType.ADMIN)
  @Post(':id/approve')
  async approveUser(@Param('id') id: string) {
    return this.peopleService.approveUser(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserType.ADMIN)
  @Post(':id/reject')
  async rejectUser(@Param('id') id: string) {
    return this.peopleService.rejectUser(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserType.ADMIN)
  @Put(':id')
  async updateById(@Param('id') id: string, @Body() changes: UpdatePeopleDto) {
    return this.peopleService.updateUser(id, changes);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserType.ADMIN)
  @Delete(':id')
  async deleteById(@Param('id') id: string) {
    return this.peopleService.deleteUser(id);
  }
  @UseGuards(JwtAuthGuard)
  @Get(':email')
  async getByEmail(@Param('email') email: string) {
    return this.peopleService.findByEmail(email);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserType.ADMIN)
  @Get()
  async getAllUsers() {
    return this.peopleService.getAllUsers();
  }
}
