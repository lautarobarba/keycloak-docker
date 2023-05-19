import { Injectable, Logger } from '@nestjs/common';


@Injectable()
export class AppService {
	private readonly _logger = new Logger(AppService.name);

	async getWelcome(): Promise<string> {
		this._logger.debug('getWelcome()');
		// Busco el año actual
		const date: Date = new Date();
		const year: string = date.getFullYear().toString();

		return `<h1 style="text-align: center;">API NESTJS</h1> <p style="position: absolute; bottom: 20px; text-align: center; width: 99%;">Documentación disponible en <a href="/api/docs">/api/docs</a>.</p> <p style="position: absolute; bottom: 0px; text-align: center; width: 99%;">${year} - NestJS</p>`;
	}
}
