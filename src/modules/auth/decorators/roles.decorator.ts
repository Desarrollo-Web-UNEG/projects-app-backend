import { SetMetadata } from '@nestjs/common';
import { UserType } from '../../people/entities/people.entity';

export const Roles = (...roles: UserType[]) => SetMetadata('roles', roles); 