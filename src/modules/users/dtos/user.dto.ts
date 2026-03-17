import { UserRole } from '../../../entities/user.entity';

export class UserDto {
  id!: number;
  email!: string;
  phone!: string | null;
  avatar!: string | null;
  role!: UserRole;
  provider!: string | null;
  createdAt!: Date;
  updatedAt!: Date;
}
