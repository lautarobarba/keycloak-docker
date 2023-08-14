import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AdministrationService } from "./administration.service";
import { AdministrationController } from "./administration.controller";
import { UserModule } from "modules/user/user.module";
import { KingdomModule } from "modules/kingdom/kingdom.module";
import { PhylumModule } from "modules/phylum/phylum.module";
import { FamilyModule } from "modules/family/family.module";

@Module({
  imports: [UserModule, KingdomModule, PhylumModule, FamilyModule],
  controllers: [AdministrationController],
  providers: [AdministrationService],
  exports: [AdministrationService],
})
export class AdministrationModule {}
