import { SetMetadata } from '@nestjs/common';
import { UserType } from '../../people/people.entity';

export const Roles = (...roles: UserType[]) => SetMetadata('roles', roles);
