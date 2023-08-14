import {
  ConflictException,
  Injectable,
  Logger,
  NotAcceptableException,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ILike, Not, Repository } from "typeorm";
import * as moment from "moment";
import { validate } from "class-validator";
import { CreateSpeciesDto, UpdateSpeciesDto } from "./species.dto";
import { Species } from "./species.entity";
import { GenusService } from "../genus/genus.service";
import { ERROR_MESSAGE } from "modules/utils/error-message";
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from "nestjs-typeorm-paginate";
import { UserService } from "modules/user/user.service";
// import { PaginatedList, PaginationDto } from "modules/utils/pagination.dto";

@Injectable()
export class SpeciesService {
  constructor(
    @InjectRepository(Species)
    private readonly _speciesRepository: Repository<Species>,
    private readonly _genusService: GenusService,
    private readonly _userService: UserService
  ) {}
  private readonly _logger = new Logger(SpeciesService.name);

  async create(
    createSpeciesDto: CreateSpeciesDto,
    userId: number
  ): Promise<Species> {
    this._logger.debug("create()");
    const {
      scientificName,
      commonName,
      englishName,
      description,
      genusId,
      organismType,
      status,
      foliageType,
      presence,
      // exampleImg,
      // foliageImg,
    } = createSpeciesDto;
    const timestamp: any = moment().format("YYYY-MM-DD HH:mm:ss");

    // Sólo voy a permitir que se repita la clave: name = "SIN DEFINIR"
    if (scientificName.toLowerCase() != "sin definir") {
      // Controlo que las claves no estén en uso
      const exists: Species = await this._speciesRepository.findOne({
        where: { scientificName: scientificName.toLowerCase(), deleted: false },
      });

      // Si existe y no esta borrado lógico entonces hay conflictos
      if (exists) {
        this._logger.debug(ERROR_MESSAGE.CLAVE_PRIMARIA_EN_USO);
        throw new ConflictException(ERROR_MESSAGE.CLAVE_PRIMARIA_EN_USO);
      }
    }

    // Si no existe entonces creo uno nuevo
    const species: Species = this._speciesRepository.create();
    species.scientificName = scientificName.toLowerCase();
    species.commonName = commonName ? commonName.toLowerCase() : null;
    species.englishName = englishName ? englishName.toLowerCase() : null;
    species.description = description ? description.toLowerCase() : null;
    species.genus = await this._genusService.findOne(genusId);
    species.organismType = organismType ? organismType : null;
    species.status = status ? status : null;
    species.foliageType = foliageType ? foliageType : null;
    species.presence = presence ? presence : null;
    species.createdAt = timestamp;
    species.updatedAt = timestamp;
    species.deleted = false;
    species.userMod = await this._userService.findOne(userId);

    // Controlo que el modelo no tenga errores antes de guardar
    const errors = await validate(species);
    if (errors && errors.length > 0) {
      this._logger.debug(ERROR_MESSAGE.NO_ACEPTABLE);
      throw new NotAcceptableException(ERROR_MESSAGE.NO_ACEPTABLE);
    }

    return this._speciesRepository.save(species);
  }

  async update(
    updateSpeciesDto: UpdateSpeciesDto,
    userId: number
  ): Promise<Species> {
    this._logger.debug("update()");
    const {
      id,
      scientificName,
      commonName,
      englishName,
      description,
      genusId,
      organismType,
      status,
      foliageType,
      presence,
      // exampleImg,
      // foliageImg,
    } = updateSpeciesDto;
    const timestamp: any = moment().format("YYYY-MM-DD HH:mm:ss");

    const species: Species = await this._speciesRepository.findOne({
      where: { id },
    });

    if (!species) {
      this._logger.debug(ERROR_MESSAGE.NO_ENCONTRADO);
      throw new NotFoundException(ERROR_MESSAGE.NO_ENCONTRADO);
    }

    // Sólo voy a permitir que se repita la clave: name = "SIN DEFINIR"
    if (scientificName.toLowerCase() != "sin definir") {
      // Controlo que las claves no estén en uso
      const exists: Species = await this._speciesRepository.findOne({
        where: {
          scientificName: scientificName.toLowerCase(),
          deleted: false,
          id: Not(id),
        },
      });

      // Si existe y no esta borrado lógico entonces hay conflictos
      if (exists) {
        this._logger.debug(ERROR_MESSAGE.CLAVE_PRIMARIA_EN_USO);
        throw new ConflictException(ERROR_MESSAGE.CLAVE_PRIMARIA_EN_USO);
      }
    }

    species.scientificName = scientificName.toLowerCase();
    species.commonName = commonName ? commonName.toLowerCase() : null;
    species.englishName = englishName ? englishName.toLowerCase() : null;
    species.description = description ? description.toLowerCase() : null;
    species.genus = await this._genusService.findOne(genusId);
    species.organismType = organismType ? organismType : null;
    species.status = status ? status : null;
    species.foliageType = foliageType ? foliageType : null;
    species.presence = presence ? presence : null;
    species.createdAt = timestamp;
    species.updatedAt = timestamp;
    species.deleted = false;
    species.userMod = await this._userService.findOne(userId);

    // Controlo que el modelo no tenga errores antes de guardar
    const errors = await validate(species);
    if (errors && errors.length > 0) {
      this._logger.debug(ERROR_MESSAGE.NO_ACEPTABLE);
      throw new NotAcceptableException(ERROR_MESSAGE.NO_ACEPTABLE);
    }

    return this._speciesRepository.save(species);
  }

  async findPaginated(
    options: IPaginationOptions & { orderBy?: string; orderDirection?: string }
  ): Promise<Pagination<Species>> {
    this._logger.debug("findPaginated()");

    return paginate<Species>(this._speciesRepository, options, {
      where: { deleted: false },
      order: { [options.orderBy]: options.orderDirection },
    });
  }

  async findAll(): Promise<Species[]> {
    this._logger.debug("findAll()");

    return this._speciesRepository.find({
      where: { deleted: false },
      order: { scientificName: "ASC" },
    });
  }

  async findOne(id: number): Promise<Species> {
    this._logger.debug("findOne()");

    return this._speciesRepository.findOne({
      where: { id },
    });
  }

  async search(value: string): Promise<Species[]> {
    this._logger.debug("search()");

    return this._speciesRepository.find({
      where: [
        { scientificName: ILike(`%${value}%`) },
        { commonName: ILike(`%${value}%`) },
        { englishName: ILike(`%${value}%`) },
        { description: ILike(`%${value}%`) },
      ],
    });
  }

  async delete(id: number, userId: number): Promise<void> {
    this._logger.debug("delete()");
    const timestamp: any = moment().format("YYYY-MM-DD HH:mm:ss");

    const species: Species = await this._speciesRepository.findOne({
      where: { id },
      relations: ["specimens"],
    });

    if (!species) {
      this._logger.debug(ERROR_MESSAGE.NO_ENCONTRADO);
      throw new NotFoundException(ERROR_MESSAGE.NO_ENCONTRADO);
    }

    // Controlo referencias
    if (species.specimens.length > 0) {
      this._logger.debug(ERROR_MESSAGE.OBJETO_REFERENCIADO);
      throw new NotFoundException(ERROR_MESSAGE.OBJETO_REFERENCIADO);
    }

    // Soft Delete
    species.deleted = true;
    species.updatedAt = timestamp;
    species.userMod = await this._userService.findOne(userId);
    await this._speciesRepository.save(species);

    // Hard Delete
    // await this._speciesRepository.remove(species);
  }
}
