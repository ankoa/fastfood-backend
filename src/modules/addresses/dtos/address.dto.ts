export class AddressDto {
  id!: number;
  street!: string | null;
  city!: string;
  district!: string;
  ward!: string | null;
  latitude!: number;
  longitude!: number;
  isDefault!: boolean;
  userId!: number;
  createdAt!: Date;
  updatedAt!: Date;
}
