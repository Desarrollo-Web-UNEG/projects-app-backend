import { IsString, IsNotEmpty } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateBadgeDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Nombre de la insignia',
    example: 'Colaborador Destacado',
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Descripción de la insignia',
    example: 'Otorgada por contribuciones significativas al proyecto.',
  })
  description: string;
}
//PartialType hace que tenga la misma estructura del registerPeopleDTO
//Pero hace que sean opcionales los atributos
export class UpdateBadgeDto extends PartialType(CreateBadgeDto) {}
