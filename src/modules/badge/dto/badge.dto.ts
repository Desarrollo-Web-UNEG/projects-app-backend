import { IsString, IsNotEmpty } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateBadgeDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  description: string;
}
//PartialType hace que tenga la misma estructura del registerPeopleDTO
//Pero hace que sean opcionales los atributos
export class UpdateBadgeDto extends PartialType(CreateBadgeDto) {}

export class AssignBadgeDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  peopleId: string;

  @ApiProperty()
  badgeId: number;
}
