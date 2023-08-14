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
import { CreateFamilyDto, UpdateFamilyDto } from "./family.dto";
import { Family } from "./family.entity";
import { ERROR_MESSAGE } from "modules/utils/error-message";
import { UserService } from "modules/user/user.service";
import { OrderTaxService } from "modules/order-tax/order-tax.service";

@Injectable()
export class FamilyService {
  constructor(
    @InjectRepository(Family)
    private readonly _familyRepository: Repository<Family>,
    private readonly _orderTaxService: OrderTaxService,
    private readonly _userService: UserService
  ) {}
  private readonly _logger = new Logger(FamilyService.name);

  async create(
    createFamilyDto: CreateFamilyDto,
    userId: number
  ): Promise<Family> {
    this._logger.debug("create()");
    const { name, description, orderTaxId } = createFamilyDto;
    const timestamp: any = moment().format("YYYY-MM-DD HH:mm:ss");

    // Sólo voy a permitir que se repita la clave: name = "SIN DEFINIR"
    if (name.toLowerCase() != "sin definir") {
      // Controlo que las claves no estén en uso
      const exists: Family = await this._familyRepository.findOne({
        where: { name: name.toLowerCase(), deleted: false },
      });

      // Si existe y no esta borrado lógico entonces hay conflictos
      if (exists) {
        this._logger.debug(ERROR_MESSAGE.CLAVE_PRIMARIA_EN_USO);
        throw new ConflictException(ERROR_MESSAGE.CLAVE_PRIMARIA_EN_USO);
      }
    }

    // Si no existe entonces creo uno nuevo
    const family: Family = this._familyRepository.create();
    family.name = name.toLowerCase();
    family.description = description ? description.toLowerCase() : null;
    family.orderTax = await this._orderTaxService.findOne(orderTaxId);
    family.createdAt = timestamp;
    family.updatedAt = timestamp;
    family.deleted = false;
    family.userMod = await this._userService.findOne(userId);

    // Controlo que el modelo no tenga errores antes de guardar
    const errors = await validate(family);
    if (errors && errors.length > 0) {
      this._logger.debug(ERROR_MESSAGE.NO_ACEPTABLE);
      throw new NotAcceptableException(ERROR_MESSAGE.NO_ACEPTABLE);
    }

    return this._familyRepository.save(family);
  }

  async update(
    updateFamilyDto: UpdateFamilyDto,
    userId: number
  ): Promise<Family> {
    this._logger.debug("update()");
    const { id, name, description, orderTaxId } = updateFamilyDto;
    const timestamp: any = moment().format("YYYY-MM-DD HH:mm:ss");

    const family: Family = await this._familyRepository.findOne({
      where: { id },
    });

    if (!family) {
      this._logger.debug(ERROR_MESSAGE.NO_ENCONTRADO);
      throw new NotFoundException(ERROR_MESSAGE.NO_ENCONTRADO);
    }

    // Sólo voy a permitir que se repita la clave: name = "SIN DEFINIR"
    if (name.toLowerCase() != "sin definir") {
      // Controlo que las claves no estén en uso
      const exists: Family = await this._familyRepository.findOne({
        where: { name: name.toLowerCase(), deleted: false, id: Not(id) },
      });

      // Si existe y no esta borrado lógico entonces hay conflictos
      if (exists) {
        this._logger.debug(ERROR_MESSAGE.CLAVE_PRIMARIA_EN_USO);
        throw new ConflictException(ERROR_MESSAGE.CLAVE_PRIMARIA_EN_USO);
      }
    }

    // Si no hay problemas actualizo los atributos
    family.name = name.toLowerCase();
    family.description = description ? description.toLowerCase() : null;
    family.orderTax = await this._orderTaxService.findOne(orderTaxId);
    family.createdAt = timestamp;
    family.updatedAt = timestamp;
    family.deleted = false;
    family.userMod = await this._userService.findOne(userId);

    // Controlo que el modelo no tenga errores antes de guardar
    const errors = await validate(family);
    if (errors && errors.length > 0) {
      this._logger.debug(ERROR_MESSAGE.NO_ACEPTABLE);
      throw new NotAcceptableException(ERROR_MESSAGE.NO_ACEPTABLE);
    }

    return this._familyRepository.save(family);
  }

  async findPaginated(
    options: IPaginationOptions & { orderBy?: string; orderDirection?: string }
  ): Promise<Pagination<Family>> {
    this._logger.debug("findPaginated()");

    return paginate<Family>(this._familyRepository, options, {
      where: { deleted: false },
      order: { [options.orderBy]: options.orderDirection },
    });
  }

  async findAll(): Promise<Family[]> {
    this._logger.debug("findAll()");

    return this._familyRepository.find({
      where: { deleted: false },
      order: { name: "ASC" },
    });
  }

  async findOne(id: number): Promise<Family> {
    this._logger.debug("findOne()");

    return this._familyRepository.findOne({
      where: { id },
    });
  }

  async search(value: string): Promise<Family[]> {
    this._logger.debug("search()");

    return this._familyRepository.find({
      where: [
        { name: ILike(`%${value}%`) },
        { description: ILike(`%${value}%`) },
      ],
    });
  }

  async delete(id: number, userId: number): Promise<void> {
    this._logger.debug("delete()");
    const timestamp: any = moment().format("YYYY-MM-DD HH:mm:ss");

    const family: Family = await this._familyRepository.findOne({
      where: { id },
      relations: ["genera"],
    });

    if (!family) {
      this._logger.debug(ERROR_MESSAGE.NO_ENCONTRADO);
      throw new NotFoundException(ERROR_MESSAGE.NO_ENCONTRADO);
    }

    // Controlo referencias
    if (family.genera.length > 0) {
      this._logger.debug(ERROR_MESSAGE.OBJETO_REFERENCIADO);
      throw new NotFoundException(ERROR_MESSAGE.OBJETO_REFERENCIADO);
    }

    // Soft Delete
    family.deleted = true;
    family.updatedAt = timestamp;
    family.userMod = await this._userService.findOne(userId);
    await this._familyRepository.save(family);

    // Hard Delete
    // await this._familyRepository.remove(family);
  }
}
