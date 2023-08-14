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
import { CreateKingdomDto, UpdateKingdomDto } from "./kingdom.dto";
import { Kingdom } from "./kingdom.entity";
import { ERROR_MESSAGE } from "modules/utils/error-message";
import { UserService } from "modules/user/user.service";

@Injectable()
export class KingdomService {
  constructor(
    @InjectRepository(Kingdom)
    private readonly _kingdomRepository: Repository<Kingdom>,
    private readonly _userService: UserService
  ) {}
  private readonly _logger = new Logger(KingdomService.name);

  async create(
    createKingdomDto: CreateKingdomDto,
    userId: number
  ): Promise<Kingdom> {
    this._logger.debug("create()");
    const { name, description } = createKingdomDto;
    const timestamp: any = moment().format("YYYY-MM-DD HH:mm:ss");

    // Sólo voy a permitir que se repita la clave: name = "SIN DEFINIR"
    if (name.toLowerCase() != "sin definir") {
      // Controlo que las claves no estén en uso
      const exists: Kingdom = await this._kingdomRepository.findOne({
        where: { name: name.toLowerCase(), deleted: false },
      });

      // Si existe y no esta borrado lógico entonces hay conflictos
      if (exists) {
        this._logger.debug(ERROR_MESSAGE.CLAVE_PRIMARIA_EN_USO);
        throw new ConflictException(ERROR_MESSAGE.CLAVE_PRIMARIA_EN_USO);
      }
    }

    // Si no existe entonces creo uno nuevo
    const kingdom: Kingdom = this._kingdomRepository.create();
    kingdom.name = name.toLowerCase();
    kingdom.description = description ? description.toLowerCase() : null;
    kingdom.createdAt = timestamp;
    kingdom.updatedAt = timestamp;
    kingdom.deleted = false;
    kingdom.userMod = await this._userService.findOne(userId);

    // Controlo que el modelo no tenga errores antes de guardar
    const errors = await validate(kingdom);
    if (errors && errors.length > 0) {
      this._logger.debug(ERROR_MESSAGE.NO_ACEPTABLE);
      throw new NotAcceptableException(ERROR_MESSAGE.NO_ACEPTABLE);
    }

    return this._kingdomRepository.save(kingdom);
  }

  async update(
    updateKingdomDto: UpdateKingdomDto,
    userId: number
  ): Promise<Kingdom> {
    this._logger.debug("update()");
    const { id, name, description } = updateKingdomDto;
    const timestamp: any = moment().format("YYYY-MM-DD HH:mm:ss");

    const kingdom: Kingdom = await this._kingdomRepository.findOne({
      where: { id },
    });

    if (!kingdom) {
      this._logger.debug(ERROR_MESSAGE.NO_ENCONTRADO);
      throw new NotFoundException(ERROR_MESSAGE.NO_ENCONTRADO);
    }

    // Sólo voy a permitir que se repita la clave: name = "SIN DEFINIR"
    if (name.toLowerCase() != "sin definir") {
      // Controlo que las claves no estén en uso
      const exists: Kingdom = await this._kingdomRepository.findOne({
        where: { name: name.toLowerCase(), deleted: false, id: Not(id) },
      });

      // Si existe y no esta borrado lógico entonces hay conflictos
      if (exists) {
        this._logger.debug(ERROR_MESSAGE.CLAVE_PRIMARIA_EN_USO);
        throw new ConflictException(ERROR_MESSAGE.CLAVE_PRIMARIA_EN_USO);
      }
    }

    // Si no hay problemas actualizo los atributos
    kingdom.name = name.toLowerCase();
    kingdom.description = description ? description.toLowerCase() : null;
    kingdom.updatedAt = timestamp;
    kingdom.userMod = await this._userService.findOne(userId);

    // Controlo que el modelo no tenga errores antes de guardar
    const errors = await validate(kingdom);
    if (errors && errors.length > 0) {
      this._logger.debug(ERROR_MESSAGE.NO_ACEPTABLE);
      throw new NotAcceptableException(ERROR_MESSAGE.NO_ACEPTABLE);
    }

    return this._kingdomRepository.save(kingdom);
  }

  async findPaginated(
    options: IPaginationOptions & { orderBy?: string; orderDirection?: string }
  ): Promise<Pagination<Kingdom>> {
    this._logger.debug("findPaginated()");

    return paginate<Kingdom>(this._kingdomRepository, options, {
      where: { deleted: false },
      order: { [options.orderBy]: options.orderDirection },
    });
  }

  async findAll(): Promise<Kingdom[]> {
    this._logger.debug("findAll()");

    return this._kingdomRepository.find({
      where: { deleted: false },
      order: { name: "ASC" },
    });
  }

  async findOne(id: number): Promise<Kingdom> {
    this._logger.debug("findOne()");

    return this._kingdomRepository.findOne({
      where: { id },
    });
  }

  async search(value: string): Promise<Kingdom[]> {
    this._logger.debug("search()");

    return this._kingdomRepository.find({
      where: [
        { name: ILike(`%${value}%`) },
        { description: ILike(`%${value}%`) },
      ],
    });
  }

  async delete(id: number, userId: number): Promise<void> {
    this._logger.debug("delete()");
    const timestamp: any = moment().format("YYYY-MM-DD HH:mm:ss");

    const kingdom: Kingdom = await this._kingdomRepository.findOne({
      where: { id },
      relations: ["phylums"],
    });

    if (!kingdom) {
      this._logger.debug(ERROR_MESSAGE.NO_ENCONTRADO);
      throw new NotFoundException(ERROR_MESSAGE.NO_ENCONTRADO);
    }

    // Controlo referencias
    if (kingdom.phylums.length > 0) {
      this._logger.debug(ERROR_MESSAGE.OBJETO_REFERENCIADO);
      throw new NotFoundException(ERROR_MESSAGE.OBJETO_REFERENCIADO);
    }

    // Soft Delete
    kingdom.deleted = true;
    kingdom.updatedAt = timestamp;
    kingdom.userMod = await this._userService.findOne(userId);
    await this._kingdomRepository.save(kingdom);

    // Hard Delete
    // await this._kingdomRepository.remove(kingdom);
  }
}
