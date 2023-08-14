import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class GlobalSearchDto {
  @ApiProperty()
  value: string;
}
