import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreatePhylumDto {
  @ApiProperty()
  name: string;

  @ApiPropertyOptional()
  description?: string;

  @ApiProperty()
  kingdomId: number;
}

export class UpdatePhylumDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiPropertyOptional()
  description?: string;

  @ApiProperty()
  kingdomId: number;
}
