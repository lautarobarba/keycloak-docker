import { Module } from "@nestjs/common";
import { SpecimenService } from "./specimen.service";
import { SpecimenController } from "./specimen.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Specimen } from "./specimen.entity";
import { UserModule } from "modules/user/user.module";
import { SpeciesModule } from "modules/species/species.module";
import { UtilsModule } from "modules/utils/utils.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([Specimen]),
    UserModule,
    SpeciesModule,
    UtilsModule,
  ],
  controllers: [SpecimenController],
  providers: [SpecimenService],
  exports: [SpecimenService],
})
export class SpecimenModule {}
