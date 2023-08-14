import { Controller, Get, Logger } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppService } from 'app.service';


@Controller()
export class AppController {
	constructor(private readonly _appService: AppService) { }
	private readonly _logger = new Logger(AppController.name);

	@Get()
	@ApiTags('Bienvenida')
	async getWelcome(): Promise<string> {
		this._logger.debug('GET: /api');
		const mensaje = await this._appService.getWelcome();
		return mensaje;
	}
}
