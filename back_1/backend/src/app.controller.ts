import { Controller, Get, Logger } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppService } from 'app.service';


@Controller()
export class AppController {
	constructor(private readonly appService: AppService) { }
	private readonly _logger = new Logger(AppController.name);

	@Get()
	@ApiTags('Bienvenida')
	async getWelcome(): Promise<string> {
		this._logger.debug('GET: /api/user');
		const mensaje = await this.appService.getWelcome();
		return mensaje;
	}
}
