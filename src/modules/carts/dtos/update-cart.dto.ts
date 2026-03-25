import { IsNumber, IsOptional } from 'class-validator';

export class UpdateCartDto {
  @IsOptional()
  @IsNumber()
  userId?: number;
}
