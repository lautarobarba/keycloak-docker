import { InjectQueue, Process, Processor } from '@nestjs/bull';
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Job, Queue } from 'bull';
import { UserService } from 'modules/user/user.service';
import { UtilsService } from 'modules/utils/utils.service';

@Processor('cron')
@Injectable()
export class CronService {
	constructor(
		@InjectQueue('cron')
		private readonly _cronQueue: Queue,
		private readonly _userService: UserService,
		private readonly _utilsService: UtilsService,
	) { }
	private readonly _logger = new Logger(CronService.name);

	// Periodo: cada 5 SEG
	// Tarea: Imprime en consola un mensaje para Testear
	// @Cron('*/5 * * * * *', {
	// 	timeZone: 'America/Argentina/Buenos_Aires',
	// })
	handleCron() {
		this._logger.debug('handleCron()');
	}

	// Periodo: cada 5 SEG
	// Tarea: Imprime en consola un mensaje para Testear
	// Envía la tarea 'handleTestCron' a la cola
	// @Cron('*/5 * * * * *', {
	// 	timeZone: 'America/Argentina/Buenos_Aires',
	// })
	async testCron() {
		this._logger.debug('testCron()');
		this._logger.debug('Tarea enviada a la cola handleTestCron por testCron');
		const job: Job = await this._cronQueue.add('handleTestCron', {
			// Por si necesito enviar datos
			msg: 'TestCron123'
		});

		return {
			jobID: job.id
		};
	}

	// Ejecula la próxima tarea 'handleTestCron' de la cola
	@Process('handleTestCron')
	async handleTestCron(job: Job) {
		this._logger.debug('handleTestCron()');
		this._logger.debug('Ejecutando tarea enviada a la cola handleTestCron por testCron');
		const { msg } = job.data;
	}

	// Periodo: cada 24HS
	// Tarea: Eliminar imagenes de perfil de usuarios que no están en uso
	// Envía la tarea 'handleDeleteProfilePictures' a la cola
	@Cron(CronExpression.EVERY_DAY_AT_1AM, {
		timeZone: 'America/Argentina/Buenos_Aires',
	})
	async deleteProfilePictures() {
		this._logger.debug('deleteProfilePictures()');
		const job: Job = await this._cronQueue.add('handleDeleteProfilePictures');

		return {
			jobID: job.id
		};
	}

	// Ejecula la próxima tarea 'handleDeleteProfilePictures' de la cola
	@Process('handleDeleteProfilePictures')
	async handleDeleteProfilePictures(job: Job) {
		this._logger.debug('handleDeleteProfilePictures()');
		await this._utilsService.deleteUselessProfilePictures();
	}
}
