import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PhylumService } from "./phylum.service";
import { PhylumController } from "./phylum.controller";
import { Phylum } from "./phylum.entity";
import { UserModule } from "modules/user/user.module";
import { KingdomModule } from "modules/kingdom/kingdom.module";

@Module({
  imports: [TypeOrmModule.forFeature([Phylum]), UserModule, KingdomModule],
  controllers: [PhylumController],
  providers: [PhylumService],
  exports: [PhylumService],
})
export class PhylumModule {}
