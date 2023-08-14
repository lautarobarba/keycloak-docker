import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { KingdomService } from "./kingdom.service";
import { KingdomController } from "./kingdom.controller";
import { Kingdom } from "./kingdom.entity";
import { UserModule } from "modules/user/user.module";

@Module({
  imports: [TypeOrmModule.forFeature([Kingdom]), UserModule],
  controllers: [KingdomController],
  providers: [KingdomService],
  exports: [KingdomService],
})
export class KingdomModule {}
