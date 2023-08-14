import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ClassTaxService } from "./class-tax.service";
import { ClassTaxController } from "./class-tax.controller";
import { ClassTax } from "./class-tax.entity";
import { UserModule } from "modules/user/user.module";
import { PhylumModule } from "modules/phylum/phylum.module";

@Module({
  imports: [TypeOrmModule.forFeature([ClassTax]), UserModule, PhylumModule],
  controllers: [ClassTaxController],
  providers: [ClassTaxService],
  exports: [ClassTaxService],
})
export class ClassTaxModule {}
