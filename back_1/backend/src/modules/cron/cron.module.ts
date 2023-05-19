import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { CronService } from './cron.service';
import { UserModule } from 'modules/user/user.module';

@Module({
	imports: [
		// Redis connection for queues
		BullModule.registerQueue({
				name: 'cron',
		}),
		UserModule,
	],
	providers: [CronService],
	exports: [CronService],
})
export class CronModule {}
