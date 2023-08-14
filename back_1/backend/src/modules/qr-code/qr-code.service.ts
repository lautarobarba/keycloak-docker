import {
  ConflictException,
  Injectable,
  Logger,
  NotAcceptableException,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { SpecimenService } from "modules/specimen/specimen.service";
import { Repository } from "typeorm";
import { CreateQRCodeDto, UpdateQRCodeDto } from "./qr-code.dto";
import { QRCode } from "./qr-code.entity";
import * as moment from "moment";
import { validate } from "class-validator";

@Injectable()
export class QRCodeService {
  constructor(
    @InjectRepository(QRCode)
    private readonly _qRCodeRepository: Repository<QRCode>,
    private readonly _specimenService: SpecimenService
  ) {}
  private readonly _logger = new Logger(QRCodeService.name);

  async create(createQRCodeDto: CreateQRCodeDto): Promise<void> {
    // this._logger.debug('create()');
    // const { title, specimenId } = createQRCodeDto;
    // const timestamp: any = moment().format('YYYY-MM-DD HH:mm:ss');
    // // Controlo que el nuevo genero no exista
    // const exists: QRCode = await this._qRCodeRepository.findOne({
    // 	where: { title },
    // });
    // // Si existe y no esta borrado lógico entonces hay conflictos
    // if (exists && !exists.deleted)
    // 	throw new ConflictException('Error: Keys already in use');
    // // Si existe pero estaba borrado lógico entonces lo recupero
    // if (exists && exists.deleted) {
    // 	if (specimenId && (specimenId !== 0)) exists.specimen = await this._specimenService.findOne(specimenId);
    // 	else exists.specimen = null;
    // 	exists.updatedAt = timestamp;
    // 	exists.deleted = false;
    // 	// Controlo que el modelo no tenga errores antes de guardar
    // 	const errors = await validate(exists);
    // 	if (errors && errors.length > 0) throw new NotAcceptableException();
    // 	return this._qRCodeRepository.save(exists);
    // }
    // // Si no existe entonces creo uno nuevo
    // const qRCode: QRCode = this._qRCodeRepository.create();
    // qRCode.title = title;
    // if (specimenId && (specimenId !== 0)) qRCode.specimen = await this._specimenService.findOne(specimenId);
    // else qRCode.specimen = null;
    // qRCode.createdAt = timestamp;
    // qRCode.updatedAt = timestamp;
    // qRCode.deleted = false;
    // // Controlo que el modelo no tenga errores antes de guardar
    // const errors = await validate(qRCode);
    // if (errors && errors.length > 0) throw new NotAcceptableException();
    // return this._qRCodeRepository.save(qRCode);
  }

  async findAll(): Promise<QRCode[]> {
    this._logger.debug("findAll()");
    return this._qRCodeRepository.find({
      where: { deleted: false },
      order: { id: "ASC" },
    });
  }

  async findOne(id: number): Promise<QRCode> {
    this._logger.debug("findOne()");
    const qRCode: QRCode = await this._qRCodeRepository.findOne({
      where: { id },
    });

    if (!qRCode) throw new NotFoundException();
    return qRCode;
  }

  async update(updateQRCodeDto: UpdateQRCodeDto): Promise<void> {
    // this._logger.debug("update()");
    // const { id, title, specimenId } = updateQRCodeDto;
    // const timestamp: any = moment().format("YYYY-MM-DD HH:mm:ss");
    // const qRCode: QRCode = await this._qRCodeRepository.findOne({
    //   where: { id },
    // });
    // if (!qRCode) throw new NotFoundException();
    // if (title) {
    //   // Controlo que las claves no estén en uso
    //   const exists: QRCode = await this._qRCodeRepository.findOne({
    //     where: { title },
    //   });
    //   // Si existe y no esta borrado lógico entonces hay conflictos
    //   if (exists && !exists.deleted && exists.id !== id)
    //     throw new ConflictException("Error: Keys already in use");
    // }
    // // Si no hay problemas actualizo los atributos
    // if (title) qRCode.title = title;
    // if (specimenId && specimenId !== 0)
    //   qRCode.specimen = await this._specimenService.findOne(specimenId);
    // else qRCode.specimen = null;
    // qRCode.updatedAt = timestamp;
    // // Controlo que el modelo no tenga errores antes de guardar
    // const errors = await validate(qRCode);
    // if (errors && errors.length > 0) throw new NotAcceptableException();
    // return this._qRCodeRepository.save(qRCode);
  }

  async delete(id: number) {
    this._logger.debug("delete()");
    const timestamp: any = moment().format("YYYY-MM-DD HH:mm:ss");

    const qRCode: QRCode = await this._qRCodeRepository.findOne({
      where: { id },
    });

    if (!qRCode) throw new NotFoundException();

    qRCode.deleted = true;
    qRCode.updatedAt = timestamp;

    // Controlo que el modelo no tenga errores antes de guardar
    const errors = await validate(qRCode);
    if (errors && errors.length > 0) throw new NotAcceptableException();

    this._qRCodeRepository.save(qRCode);
  }
}
