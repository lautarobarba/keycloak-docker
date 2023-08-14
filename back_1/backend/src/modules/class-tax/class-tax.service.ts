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
import { CreateClassTaxDto, UpdateClassTaxDto } from "./class-tax.dto";
import { ClassTax } from "./class-tax.entity";
import { ERROR_MESSAGE } from "modules/utils/error-message";
import { UserService } from "modules/user/user.service";
import { PhylumService } from "modules/phylum/phylum.service";

@Injectable()
export class ClassTaxService {
  constructor(
    @InjectRepository(ClassTax)
    private readonly _classTaxRepository: Repository<ClassTax>,
    private readonly _phylumService: PhylumService,
    private readonly _userService: UserService
  ) {}
  private readonly _logger = new Logger(ClassTaxService.name);

  async create(
    createClassTaxDto: CreateClassTaxDto,
    userId: number
  ): Promise<ClassTax> {
    this._logger.debug("create()");
    const { name, description, phylumId } = createClassTaxDto;
    const timestamp: any = moment().format("YYYY-MM-DD HH:mm:ss");

    // Sólo voy a permitir que se repita la clave: name = "SIN DEFINIR"
    if (name.toLowerCase() != "sin definir") {
      // Controlo que las claves no estén en uso
      const exists: ClassTax = await this._classTaxRepository.findOne({
        where: { name: name.toLowerCase(), deleted: false },
      });

      // Si existe y no esta borrado lógico entonces hay conflictos
      if (exists) {
        this._logger.debug(ERROR_MESSAGE.CLAVE_PRIMARIA_EN_USO);
        throw new ConflictException(ERROR_MESSAGE.CLAVE_PRIMARIA_EN_USO);
      }
    }

    // Si no existe entonces creo uno nuevo
    const classTax: ClassTax = this._classTaxRepository.create();
    classTax.name = name.toLowerCase();
    classTax.description = description ? description.toLowerCase() : null;
    classTax.phylum = await this._phylumService.findOne(phylumId);
    classTax.createdAt = timestamp;
    classTax.updatedAt = timestamp;
    classTax.deleted = false;
    classTax.userMod = await this._userService.findOne(userId);

    // Controlo que el modelo no tenga errores antes de guardar
    const errors = await validate(classTax);
    if (errors && errors.length > 0) {
      this._logger.debug(ERROR_MESSAGE.NO_ACEPTABLE);
      throw new NotAcceptableException(ERROR_MESSAGE.NO_ACEPTABLE);
    }

    return this._classTaxRepository.save(classTax);
  }

  async update(
    updateClassTaxDto: UpdateClassTaxDto,
    userId: number
  ): Promise<ClassTax> {
    this._logger.debug("update()");
    const { id, name, description, phylumId } = updateClassTaxDto;
    const timestamp: any = moment().format("YYYY-MM-DD HH:mm:ss");

    const classTax: ClassTax = await this._classTaxRepository.findOne({
      where: { id },
    });

    if (!classTax) {
      this._logger.debug(ERROR_MESSAGE.NO_ENCONTRADO);
      throw new NotFoundException(ERROR_MESSAGE.NO_ENCONTRADO);
    }

    // Sólo voy a permitir que se repita la clave: name = "SIN DEFINIR"
    if (name.toLowerCase() != "sin definir") {
      // Controlo que las claves no estén en uso
      const exists: ClassTax = await this._classTaxRepository.findOne({
        where: { name: name.toLowerCase(), deleted: false, id: Not(id) },
      });

      // Si existe y no esta borrado lógico entonces hay conflictos
      if (exists) {
        this._logger.debug(ERROR_MESSAGE.CLAVE_PRIMARIA_EN_USO);
        throw new ConflictException(ERROR_MESSAGE.CLAVE_PRIMARIA_EN_USO);
      }
    }

    // Si no hay problemas actualizo los atributos
    classTax.name = name.toLowerCase();
    classTax.description = description ? description.toLowerCase() : null;
    classTax.phylum = await this._phylumService.findOne(phylumId);
    classTax.updatedAt = timestamp;
    classTax.userMod = await this._userService.findOne(userId);

    // Controlo que el modelo no tenga errores antes de guardar
    const errors = await validate(classTax);
    if (errors && errors.length > 0) {
      this._logger.debug(ERROR_MESSAGE.NO_ACEPTABLE);
      throw new NotAcceptableException(ERROR_MESSAGE.NO_ACEPTABLE);
    }

    return this._classTaxRepository.save(classTax);
  }

  async findPaginated(
    options: IPaginationOptions & { orderBy?: string; orderDirection?: string }
  ): Promise<Pagination<ClassTax>> {
    this._logger.debug("findPaginated()");

    return paginate<ClassTax>(this._classTaxRepository, options, {
      where: { deleted: false },
      order: { [options.orderBy]: options.orderDirection },
    });
  }

  async findAll(): Promise<ClassTax[]> {
    this._logger.debug("findAll()");

    return this._classTaxRepository.find({
      where: { deleted: false },
      order: { name: "ASC" },
    });
  }

  async findOne(id: number): Promise<ClassTax> {
    this._logger.debug("findOne()");

    return this._classTaxRepository.findOne({
      where: { id },
    });
  }

  async search(value: string): Promise<ClassTax[]> {
    this._logger.debug("search()");

    return this._classTaxRepository.find({
      where: [
        { name: ILike(`%${value}%`) },
        { description: ILike(`%${value}%`) },
      ],
    });
  }

  async delete(id: number, userId: number): Promise<void> {
    this._logger.debug("delete()");
    const timestamp: any = moment().format("YYYY-MM-DD HH:mm:ss");

    const classTax: ClassTax = await this._classTaxRepository.findOne({
      where: { id },
      relations: ["ordersTax"],
    });

    if (!classTax) {
      this._logger.debug(ERROR_MESSAGE.NO_ENCONTRADO);
      throw new NotFoundException(ERROR_MESSAGE.NO_ENCONTRADO);
    }

    // Controlo referencias
    if (classTax.ordersTax.length > 0) {
      this._logger.debug(ERROR_MESSAGE.OBJETO_REFERENCIADO);
      throw new NotFoundException(ERROR_MESSAGE.OBJETO_REFERENCIADO);
    }

    // Soft Delete
    classTax.deleted = true;
    classTax.updatedAt = timestamp;
    classTax.userMod = await this._userService.findOne(userId);
    await this._classTaxRepository.save(classTax);

    // Hard Delete
    // await this._classTaxRepository.remove(classTax);
  }
}
