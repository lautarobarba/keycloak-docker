import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { CronService } from './cron.service';
import { UserModule } from 'modules/user/user.module';
import { UtilsModule } from 'modules/utils/utils.module';

@Module({
	imports: [
		// Redis connection for queues
		BullModule.registerQueue({
			name: 'cron',
		}),
		UserModule,
		UtilsModule
	],
	providers: [CronService],
	exports: [CronService],
})
export class CronModule { }
