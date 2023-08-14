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
import { CreateGenusDto, UpdateGenusDto } from "./genus.dto";
import { Genus } from "./genus.entity";
import { ERROR_MESSAGE } from "modules/utils/error-message";
import { UserService } from "modules/user/user.service";
import { FamilyService } from "modules/family/family.service";

@Injectable()
export class GenusService {
  constructor(
    @InjectRepository(Genus)
    private readonly _genusRepository: Repository<Genus>,
    private readonly _familyService: FamilyService,
    private readonly _userService: UserService
  ) {}
  private readonly _logger = new Logger(GenusService.name);

  async create(createGenusDto: CreateGenusDto, userId: number): Promise<Genus> {
    this._logger.debug("create()");
    const { name, description, familyId } = createGenusDto;
    const timestamp: any = moment().format("YYYY-MM-DD HH:mm:ss");

    // Sólo voy a permitir que se repita la clave: name = "SIN DEFINIR"
    if (name.toLowerCase() != "sin definir") {
      // Controlo que las claves no estén en uso
      const exists: Genus = await this._genusRepository.findOne({
        where: { name: name.toLowerCase(), deleted: false },
      });

      // Si existe y no esta borrado lógico entonces hay conflictos
      if (exists) {
        this._logger.debug(ERROR_MESSAGE.CLAVE_PRIMARIA_EN_USO);
        throw new ConflictException(ERROR_MESSAGE.CLAVE_PRIMARIA_EN_USO);
      }
    }

    // Si no existe entonces creo uno nuevo
    const genus: Genus = this._genusRepository.create();
    genus.name = name.toLowerCase();
    genus.description = description ? description.toLowerCase() : null;
    genus.family = await this._familyService.findOne(familyId);
    genus.createdAt = timestamp;
    genus.updatedAt = timestamp;
    genus.deleted = false;
    genus.userMod = await this._userService.findOne(userId);

    // Controlo que el modelo no tenga errores antes de guardar
    const errors = await validate(genus);
    if (errors && errors.length > 0) {
      this._logger.debug(ERROR_MESSAGE.NO_ACEPTABLE);
      throw new NotAcceptableException(ERROR_MESSAGE.NO_ACEPTABLE);
    }

    return this._genusRepository.save(genus);
  }

  async update(updateGenusDto: UpdateGenusDto, userId: number): Promise<Genus> {
    this._logger.debug("update()");
    const { id, name, description, familyId } = updateGenusDto;
    const timestamp: any = moment().format("YYYY-MM-DD HH:mm:ss");

    const genus: Genus = await this._genusRepository.findOne({
      where: { id },
    });

    if (!genus) {
      this._logger.debug(ERROR_MESSAGE.NO_ENCONTRADO);
      throw new NotFoundException(ERROR_MESSAGE.NO_ENCONTRADO);
    }

    // Sólo voy a permitir que se repita la clave: name = "SIN DEFINIR"
    if (name.toLowerCase() != "sin definir") {
      // Controlo que las claves no estén en uso
      const exists: Genus = await this._genusRepository.findOne({
        where: { name: name.toLowerCase(), deleted: false, id: Not(id) },
      });

      // Si existe y no esta borrado lógico entonces hay conflictos
      if (exists) {
        this._logger.debug(ERROR_MESSAGE.CLAVE_PRIMARIA_EN_USO);
        throw new ConflictException(ERROR_MESSAGE.CLAVE_PRIMARIA_EN_USO);
      }
    }

    // Si no hay problemas actualizo los atributos
    genus.name = name.toLowerCase();
    genus.description = description ? description.toLowerCase() : null;
    genus.family = await this._familyService.findOne(familyId);
    genus.updatedAt = timestamp;
    genus.userMod = await this._userService.findOne(userId);

    // Controlo que el modelo no tenga errores antes de guardar
    const errors = await validate(genus);
    if (errors && errors.length > 0) {
      this._logger.debug(ERROR_MESSAGE.NO_ACEPTABLE);
      throw new NotAcceptableException(ERROR_MESSAGE.NO_ACEPTABLE);
    }

    return this._genusRepository.save(genus);
  }

  async findPaginated(
    options: IPaginationOptions & { orderBy?: string; orderDirection?: string }
  ): Promise<Pagination<Genus>> {
    this._logger.debug("findPaginated()");

    return paginate<Genus>(this._genusRepository, options, {
      where: { deleted: false },
      order: { [options.orderBy]: options.orderDirection },
    });
  }

  async findAll(): Promise<Genus[]> {
    this._logger.debug("findAll()");

    return this._genusRepository.find({
      where: { deleted: false },
      order: { name: "ASC" },
    });
  }

  async findOne(id: number): Promise<Genus> {
    this._logger.debug("findOne()");

    return this._genusRepository.findOne({
      where: { id },
    });
  }

  async search(value: string): Promise<Genus[]> {
    this._logger.debug("search()");

    return this._genusRepository.find({
      where: [
        { name: ILike(`%${value}%`) },
        { description: ILike(`%${value}%`) },
      ],
    });
  }

  async delete(id: number, userId: number): Promise<void> {
    this._logger.debug("delete()");
    const timestamp: any = moment().format("YYYY-MM-DD HH:mm:ss");

    const genus: Genus = await this._genusRepository.findOne({
      where: { id },
      relations: ["species"],
    });

    if (!genus) {
      this._logger.debug(ERROR_MESSAGE.NO_ENCONTRADO);
      throw new NotFoundException(ERROR_MESSAGE.NO_ENCONTRADO);
    }

    // Controlo referencias
    if (genus.species.length > 0) {
      this._logger.debug(ERROR_MESSAGE.OBJETO_REFERENCIADO);
      throw new NotFoundException(ERROR_MESSAGE.OBJETO_REFERENCIADO);
    }

    // Soft Delete
    genus.deleted = true;
    genus.updatedAt = timestamp;
    genus.userMod = await this._userService.findOne(userId);
    await this._genusRepository.save(genus);

    // Hard Delete
    // await this._genusRepository.remove(genus);
  }
}
