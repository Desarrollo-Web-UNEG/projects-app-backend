import { IsString, IsNotEmpty } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateTechnologyDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;
}
//PartialType hace que tenga la misma estructura del registerPeopleDTO
//Pero hace que sean opcionales los atributos
export class UpdateTechnologyDto extends PartialType(CreateTechnologyDto) {}
