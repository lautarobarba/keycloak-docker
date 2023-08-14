import {
	ConflictException,
	Injectable,
	Logger,
	NotAcceptableException,
	NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as moment from 'moment';
import { validate } from 'class-validator';
import { Picture } from './picture.entity';
import { Express } from 'express';
import * as mv from 'mv';
import * as fs from 'fs';


@Injectable()
export class UtilsService {
	constructor(
		@InjectRepository(Picture)
		private readonly _pictureRepository: Repository<Picture>,
	) { }
	private readonly _logger = new Logger(UtilsService.name);

	async saveProfilePicture(picture: Express.Multer.File): Promise<Picture> {
		this._logger.debug('saveProfilePicture()');
		const timestamp: any = moment().format('YYYY-MM-DD HH:mm:ss');

		// 1° Voy a mover la imagen desde la carpeta temporal donde la recibí
		const imgSource = picture.path;
		const imgDestination = imgSource.replace('temp', 'profile-pictures');
		mv(imgSource, imgDestination, { mkdirp: true }, (err: Error) => {
			console.log(err);
		});

		// 2° La guardo en la DB
		const newProfilePicture: Picture = this._pictureRepository.create();
		newProfilePicture.fileName = picture.filename;
		newProfilePicture.path = imgDestination;
		newProfilePicture.mimetype = picture.mimetype;
		newProfilePicture.originalName = picture.originalname;
		newProfilePicture.createdAt = timestamp;
		newProfilePicture.updatedAt = timestamp;
		newProfilePicture.deleted = false;

		return this._pictureRepository.save(newProfilePicture);
	}

	async findOnePicture(id: number): Promise<Picture> {
		this._logger.debug('findOne()');
		const picture: Picture = await this._pictureRepository.findOne({
			where: { id },
		});

		if (!picture) throw new NotFoundException();
		return picture;
	}

	async deletePicture(id: number) {
		this._logger.debug('delete()');
		const timestamp: any = moment().format('YYYY-MM-DD HH:mm:ss');

		const picture: Picture = await this._pictureRepository.findOne({
			where: { id },
		});

		if (!picture) throw new NotFoundException();

		picture.deleted = true;
		picture.updatedAt = timestamp;

		// Controlo que el modelo no tenga errores antes de guardar
		const errors = await validate(picture);
		if (errors && errors.length > 0) throw new NotAcceptableException();

		this._pictureRepository.save(picture);
	}

	async deleteUselessProfilePictures() {
		this._logger.debug('deleteUselessProfilePictures()');
		const profilePictures: Picture[] = await this._pictureRepository.find({
			where: { deleted: true, fileDeleted: false },
		});

		// console.log(profilePictures);
		profilePictures.forEach(async (pp) => {
			const timestamp: any = moment().format('YYYY-MM-DD HH:mm:ss');
			fs.unlink(pp.path, (err: Error) => {
				if (err) console.log(err);
			});
			pp.fileDeleted = true;
			pp.updatedAt = timestamp;
			await this._pictureRepository.save(pp);
		});
	}
}
