import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Express } from "express";
import { FoliageType, OrganismType, Presence, Status } from "./species.entity";

export class CreateSpeciesDto {
  @ApiProperty()
  scientificName: string;

  @ApiPropertyOptional()
  commonName?: string;

  @ApiPropertyOptional()
  englishName?: string;

  @ApiPropertyOptional()
  description?: string;

  @ApiProperty()
  genusId: number;

  @ApiProperty()
  organismType: OrganismType;

  @ApiProperty()
  status: Status;

  @ApiProperty()
  foliageType: FoliageType;

  @ApiProperty()
  presence: Presence;

  // @ApiPropertyOptional({
  //   type: "string",
  //   format: "binary",
  // })
  // exampleImg?: Express.Multer.File;

  // @ApiPropertyOptional({
  //   type: "string",
  //   format: "binary",
  // })
  // foliageImg?: Express.Multer.File;
}

export class UpdateSpeciesDto extends CreateSpeciesDto {
  @ApiProperty()
  id: number;

  // @ApiPropertyOptional({
  //   type: "string",
  //   format: "binary",
  // })
  // file?: {
  //   exampleImg?: Express.Multer.File;
  // };

  @ApiPropertyOptional({
    type: "string",
    format: "binary",
  })
  exampleImg?: Express.Multer.File;

  @ApiPropertyOptional({
    type: "string",
    format: "binary",
  })
  foliageImg?: Express.Multer.File;
}
