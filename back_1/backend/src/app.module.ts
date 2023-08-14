import { Module } from "@nestjs/common";
import { BullModule } from "@nestjs/bull";
import { ScheduleModule } from "@nestjs/schedule";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { DatabaseModule } from "./database/database.module";
import { UserModule } from "./modules/user/user.module";
import { AuthModule } from "./modules/auth/auth.module";

@Module({
  imports: [
    // PostgreSQL connection
    DatabaseModule,
    // Cron Jobs
    ScheduleModule.forRoot(),
    // Auth
    AuthModule,
    UserModule,
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
