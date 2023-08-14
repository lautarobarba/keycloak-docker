import { Module } from '@nestjs/common';
import { MailerService } from './mailer.service';
import { MailerController } from './mailer.controller';
import { MailerModule as MailerModuleNest } from '@nestjs-modules/mailer';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { UserModule } from '../user/user.module';
import { BullModule } from '@nestjs/bull';

@Module({
	imports: [
		MailerModuleNest.forRoot({
			transport: {
				host: process.env.SMTP_HOST,
				port: parseInt(process.env.SMTP_PORT),
				// secure: process.env.SMTP_SECURE,
				auth: {
					user: process.env.SMTP_USER,
					pass: process.env.SMTP_PASSWORD,
				},
			},
			defaults: {
				from: '"No Reply" <noreply@example.com>',
			},
			template: {
				dir: join(__dirname, '../../../emails/templates'),
				adapter: new HandlebarsAdapter(),
				options: {
					strict: true,
				},
			},
		}),
		// Redis connection for queues
		BullModule.registerQueue({
			name: 'emailSender',
		}),
		UserModule,
	],
	controllers: [MailerController],
	providers: [MailerService],
	exports: [MailerService],
})
export class MailerModule { }
