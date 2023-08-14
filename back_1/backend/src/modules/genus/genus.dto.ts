import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateGenusDto {
  @ApiProperty()
  name: string;

  @ApiPropertyOptional()
  description?: string;

  @ApiProperty()
  familyId: number;
}

export class UpdateGenusDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiPropertyOptional()
  description?: string;

  @ApiProperty()
  familyId: number;
}
