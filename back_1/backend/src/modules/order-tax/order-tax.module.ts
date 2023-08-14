import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrderTaxService } from "./order-tax.service";
import { OrderTaxController } from "./order-tax.controller";
import { OrderTax } from "./order-tax.entity";
import { UserModule } from "modules/user/user.module";
import { ClassTaxModule } from "modules/class-tax/class-tax.module";

@Module({
  imports: [TypeOrmModule.forFeature([OrderTax]), UserModule, ClassTaxModule],
  controllers: [OrderTaxController],
  providers: [OrderTaxService],
  exports: [OrderTaxService],
})
export class OrderTaxModule {}
