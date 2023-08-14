import { Module } from "@nestjs/common";
import { BullModule } from "@nestjs/bull";
import { ScheduleModule } from "@nestjs/schedule";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { DatabaseModule } from "./database/database.module";
import { UserModule } from "./modules/user/user.module";
import { AuthModule } from "./modules/auth/auth.module";
import { MailerModule } from "./modules/mailer/mailer.module";
import { CronModule } from "./modules/cron/cron.module";
import { FamilyModule } from "./modules/family/family.module";
import { GenusModule } from "./modules/genus/genus.module";
import { SpeciesModule } from "./modules/species/species.module";
import { UtilsModule } from "./modules/utils/utils.module";
import { SpecimenModule } from "./modules/specimen/specimen.module";
import { QRCodeModule } from "./modules/qr-code/qr-code.module";
import { KingdomModule } from "modules/kingdom/kingdom.module";
import { AdministrationModule } from "modules/administration/administration.module";
import { PhylumModule } from "modules/phylum/phylum.module";
import { ClassTaxModule } from "modules/class-tax/class-tax.module";
import { OrderTaxModule } from "modules/order-tax/order-tax.module";
import { ImageModule } from "modules/image/image.module";

@Module({
  imports: [
    // PostgreSQL connection
    DatabaseModule,
    // Redis connection for queues
    BullModule.forRootAsync({
      useFactory: async () => ({
        redis: {
          host: "jbu_redis",
          port: 6379,
        },
      }),
    }),
    // Cron Jobs
    ScheduleModule.forRoot(),
    // Auth
    AuthModule,
    UserModule,
    // Utils
    ImageModule,
    UtilsModule,
    MailerModule,
    CronModule,
    // App modules
    KingdomModule,
    PhylumModule,
    ClassTaxModule,
    OrderTaxModule,
    FamilyModule,
    GenusModule,
    SpeciesModule,
    SpecimenModule,
    QRCodeModule,
    AdministrationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  static port: number | string;

  constructor() {
    AppModule.port = process.env.APP_PORT || 3000;
  }
}
