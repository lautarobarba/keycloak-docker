import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateKingdomDto {
  @ApiProperty()
  name: string;

  @ApiPropertyOptional()
  description?: string;
}

export class UpdateKingdomDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiPropertyOptional()
  description?: string;
}
