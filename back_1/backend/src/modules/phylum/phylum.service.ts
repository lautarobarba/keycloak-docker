import {
  ConflictException,
  Injectable,
  Logger,
  NotAcceptableException,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Not, Repository, ILike } from "typeorm";
import * as moment from "moment";
import { validate } from "class-validator";
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from "nestjs-typeorm-paginate";
import { CreatePhylumDto, UpdatePhylumDto } from "./phylum.dto";
import { Phylum } from "./phylum.entity";
import { ERROR_MESSAGE } from "modules/utils/error-message";
import { UserService } from "modules/user/user.service";
import { KingdomService } from "modules/kingdom/kingdom.service";

@Injectable()
export class PhylumService {
  constructor(
    @InjectRepository(Phylum)
    private readonly _phylumRepository: Repository<Phylum>,
    private readonly _kingdomService: KingdomService,
    private readonly _userService: UserService
  ) {}
  private readonly _logger = new Logger(PhylumService.name);

  async create(
    createPhylumDto: CreatePhylumDto,
    userId: number
  ): Promise<Phylum> {
    this._logger.debug("create()");
    const { name, description, kingdomId } = createPhylumDto;
    const timestamp: any = moment().format("YYYY-MM-DD HH:mm:ss");

    // Sólo voy a permitir que se repita la clave: name = "SIN DEFINIR"
    if (name.toLowerCase() != "sin definir") {
      // Controlo que las claves no estén en uso
      const exists: Phylum = await this._phylumRepository.findOne({
        where: { name: name.toLowerCase(), deleted: false },
      });

      // Si existe y no esta borrado lógico entonces hay conflictos
      if (exists) {
        this._logger.debug(ERROR_MESSAGE.CLAVE_PRIMARIA_EN_USO);
        throw new ConflictException(ERROR_MESSAGE.CLAVE_PRIMARIA_EN_USO);
      }
    }

    // Si no existe entonces creo uno nuevo
    const phylum: Phylum = this._phylumRepository.create();
    phylum.name = name.toLowerCase();
    phylum.description = description ? description.toLowerCase() : null;
    phylum.kingdom = await this._kingdomService.findOne(kingdomId);
    phylum.createdAt = timestamp;
    phylum.updatedAt = timestamp;
    phylum.deleted = false;
    phylum.userMod = await this._userService.findOne(userId);

    // Controlo que el modelo no tenga errores antes de guardar
    const errors = await validate(phylum);
    if (errors && errors.length > 0) {
      this._logger.debug(ERROR_MESSAGE.NO_ACEPTABLE);
      throw new NotAcceptableException(ERROR_MESSAGE.NO_ACEPTABLE);
    }

    return this._phylumRepository.save(phylum);
  }

  async update(
    updatePhylumDto: UpdatePhylumDto,
    userId: number
  ): Promise<Phylum> {
    this._logger.debug("update()");
    const { id, name, description, kingdomId } = updatePhylumDto;
    const timestamp: any = moment().format("YYYY-MM-DD HH:mm:ss");

    const phylum: Phylum = await this._phylumRepository.findOne({
      where: { id },
    });

    if (!phylum) {
      this._logger.debug(ERROR_MESSAGE.NO_ENCONTRADO);
      throw new NotFoundException(ERROR_MESSAGE.NO_ENCONTRADO);
    }

    // Sólo voy a permitir que se repita la clave: name = "SIN DEFINIR"
    if (name.toLowerCase() != "sin definir") {
      // Controlo que las claves no estén en uso
      const exists: Phylum = await this._phylumRepository.findOne({
        where: { name: name.toLowerCase(), deleted: false, id: Not(id) },
      });

      // Si existe y no esta borrado lógico entonces hay conflictos
      if (exists) {
        this._logger.debug(ERROR_MESSAGE.CLAVE_PRIMARIA_EN_USO);
        throw new ConflictException(ERROR_MESSAGE.CLAVE_PRIMARIA_EN_USO);
      }
    }

    // Si no hay problemas actualizo los atributos
    phylum.name = name.toLowerCase();
    phylum.description = description ? description.toLowerCase() : null;
    phylum.kingdom = await this._kingdomService.findOne(kingdomId);
    phylum.updatedAt = timestamp;
    phylum.userMod = await this._userService.findOne(userId);

    // Controlo que el modelo no tenga errores antes de guardar
    const errors = await validate(phylum);
    if (errors && errors.length > 0) {
      this._logger.debug(ERROR_MESSAGE.NO_ACEPTABLE);
      throw new NotAcceptableException(ERROR_MESSAGE.NO_ACEPTABLE);
    }

    return this._phylumRepository.save(phylum);
  }

  async findPaginated(
    options: IPaginationOptions & { orderBy?: string; orderDirection?: string }
  ): Promise<Pagination<Phylum>> {
    this._logger.debug("findPaginated()");

    return paginate<Phylum>(this._phylumRepository, options, {
      where: { deleted: false },
      order: { [options.orderBy]: options.orderDirection },
    });
  }

  async findAll(): Promise<Phylum[]> {
    this._logger.debug("findAll()");

    return this._phylumRepository.find({
      where: { deleted: false },
      order: { name: "ASC" },
    });
  }

  async findOne(id: number): Promise<Phylum> {
    this._logger.debug("findOne()");

    return this._phylumRepository.findOne({
      where: { id },
    });
  }

  async search(value: string): Promise<Phylum[]> {
    this._logger.debug("search()");

    return this._phylumRepository.find({
      where: [
        { name: ILike(`%${value}%`) },
        { description: ILike(`%${value}%`) },
      ],
    });
  }

  async delete(id: number, userId: number): Promise<void> {
    this._logger.debug("delete()");
    const timestamp: any = moment().format("YYYY-MM-DD HH:mm:ss");

    const phylum: Phylum = await this._phylumRepository.findOne({
      where: { id },
      relations: ["classesTax"],
    });

    if (!phylum) {
      this._logger.debug(ERROR_MESSAGE.NO_ENCONTRADO);
      throw new NotFoundException(ERROR_MESSAGE.NO_ENCONTRADO);
    }

    // Controlo referencias
    if (phylum.classesTax.length > 0) {
      this._logger.debug(ERROR_MESSAGE.OBJETO_REFERENCIADO);
      throw new NotFoundException(ERROR_MESSAGE.OBJETO_REFERENCIADO);
    }

    // Soft Delete
    phylum.deleted = true;
    phylum.updatedAt = timestamp;
    phylum.userMod = await this._userService.findOne(userId);
    await this._phylumRepository.save(phylum);

    // Hard Delete
    // await this._phylumRepository.remove(phylum);
  }
}
