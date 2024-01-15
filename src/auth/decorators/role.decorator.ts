import { SetMetadata } from '@nestjs/common';
import { Roles } from 'types/roles';

const RequiredRoles = (...roles: Roles[]) => SetMetadata('roles', roles);

export default RequiredRoles;
