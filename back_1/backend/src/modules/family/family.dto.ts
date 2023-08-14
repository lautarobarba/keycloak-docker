import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateFamilyDto {
  @ApiProperty()
  name: string;

  @ApiPropertyOptional()
  description?: string;

  @ApiProperty()
  orderTaxId: number;
}

export class UpdateFamilyDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiPropertyOptional()
  description?: string;

  @ApiProperty()
  orderTaxId: number;
}
