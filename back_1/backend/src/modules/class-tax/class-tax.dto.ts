import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateClassTaxDto {
  @ApiProperty()
  name: string;

  @ApiPropertyOptional()
  description?: string;

  @ApiProperty()
  phylumId: number;
}

export class UpdateClassTaxDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiPropertyOptional()
  description?: string;

  @ApiProperty()
  phylumId: number;
}
