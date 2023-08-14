import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GenusService } from "./genus.service";
import { GenusController } from "./genus.controller";
import { Genus } from "./genus.entity";
import { UserModule } from "modules/user/user.module";
import { FamilyModule } from "modules/family/family.module";

@Module({
  imports: [TypeOrmModule.forFeature([Genus]), UserModule, FamilyModule],
  controllers: [GenusController],
  providers: [GenusService],
  exports: [GenusService],
})
export class GenusModule {}
