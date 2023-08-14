import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Express } from "express";

export class CreateSpecimenDto {
  @ApiProperty()
  name: string;

  @ApiPropertyOptional()
  description?: string;

  @ApiProperty()
  speciesId: number;

  @ApiPropertyOptional()
  coordLat?: string;

  @ApiPropertyOptional()
  coordLon?: string;
}

export class UpdateSpecimenDto {
  @ApiProperty()
  id: number;

  @ApiPropertyOptional()
  name?: string;

  @ApiPropertyOptional()
  description?: string;

  @ApiPropertyOptional()
  speciesId?: number;

  @ApiPropertyOptional()
  coordLat?: string;

  @ApiPropertyOptional()
  coordLon?: string;
}
