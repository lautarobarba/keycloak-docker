import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateOrderTaxDto {
  @ApiProperty()
  name: string;

  @ApiPropertyOptional()
  description?: string;

  @ApiProperty()
  classTaxId: number;
}

export class UpdateOrderTaxDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiPropertyOptional()
  description?: string;

  @ApiProperty()
  classTaxId: number;
}
