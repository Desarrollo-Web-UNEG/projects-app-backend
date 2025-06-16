import { SetMetadata } from '@nestjs/common';
import { UserType } from '../../people/entities';

export const Roles = (...roles: UserType[]) => SetMetadata('roles', roles);
