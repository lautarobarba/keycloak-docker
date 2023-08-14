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
import { CreateOrderTaxDto, UpdateOrderTaxDto } from "./order-tax.dto";
import { OrderTax } from "./order-tax.entity";
import { ERROR_MESSAGE } from "modules/utils/error-message";
import { UserService } from "modules/user/user.service";
import { ClassTaxService } from "modules/class-tax/class-tax.service";

@Injectable()
export class OrderTaxService {
  constructor(
    @InjectRepository(OrderTax)
    private readonly _orderTaxRepository: Repository<OrderTax>,
    private readonly _classTaxService: ClassTaxService,
    private readonly _userService: UserService
  ) {}
  private readonly _logger = new Logger(OrderTaxService.name);

  async create(
    createOrderTaxDto: CreateOrderTaxDto,
    userId: number
  ): Promise<OrderTax> {
    this._logger.debug("create()");
    const { name, description, classTaxId } = createOrderTaxDto;
    const timestamp: any = moment().format("YYYY-MM-DD HH:mm:ss");

    // Sólo voy a permitir que se repita la clave: name = "SIN DEFINIR"
    if (name.toLowerCase() != "sin definir") {
      // Controlo que las claves no estén en uso
      const exists: OrderTax = await this._orderTaxRepository.findOne({
        where: { name: name.toLowerCase(), deleted: false },
      });

      // Si existe y no esta borrado lógico entonces hay conflictos
      if (exists) {
        this._logger.debug(ERROR_MESSAGE.CLAVE_PRIMARIA_EN_USO);
        throw new ConflictException(ERROR_MESSAGE.CLAVE_PRIMARIA_EN_USO);
      }
    }

    // Si no existe entonces creo uno nuevo
    const orderTax: OrderTax = this._orderTaxRepository.create();
    orderTax.name = name.toLowerCase();
    orderTax.description = description ? description.toLowerCase() : null;
    orderTax.classTax = await this._classTaxService.findOne(classTaxId);
    orderTax.createdAt = timestamp;
    orderTax.updatedAt = timestamp;
    orderTax.deleted = false;
    orderTax.userMod = await this._userService.findOne(userId);

    // Controlo que el modelo no tenga errores antes de guardar
    const errors = await validate(orderTax);
    if (errors && errors.length > 0) {
      this._logger.debug(ERROR_MESSAGE.NO_ACEPTABLE);
      throw new NotAcceptableException(ERROR_MESSAGE.NO_ACEPTABLE);
    }

    return this._orderTaxRepository.save(orderTax);
  }

  async update(
    updateOrderTaxDto: UpdateOrderTaxDto,
    userId: number
  ): Promise<OrderTax> {
    this._logger.debug("update()");
    const { id, name, description, classTaxId } = updateOrderTaxDto;
    const timestamp: any = moment().format("YYYY-MM-DD HH:mm:ss");

    const orderTax: OrderTax = await this._orderTaxRepository.findOne({
      where: { id },
    });

    if (!orderTax) {
      this._logger.debug(ERROR_MESSAGE.NO_ENCONTRADO);
      throw new NotFoundException(ERROR_MESSAGE.NO_ENCONTRADO);
    }

    // Sólo voy a permitir que se repita la clave: name = "SIN DEFINIR"
    if (name.toLowerCase() != "sin definir") {
      // Controlo que las claves no estén en uso
      const exists: OrderTax = await this._orderTaxRepository.findOne({
        where: { name: name.toLowerCase(), deleted: false, id: Not(id) },
      });

      // Si existe y no esta borrado lógico entonces hay conflictos
      if (exists) {
        this._logger.debug(ERROR_MESSAGE.CLAVE_PRIMARIA_EN_USO);
        throw new ConflictException(ERROR_MESSAGE.CLAVE_PRIMARIA_EN_USO);
      }
    }

    // Si no hay problemas actualizo los atributos
    orderTax.name = name.toLowerCase();
    orderTax.description = description ? description.toLowerCase() : null;
    orderTax.classTax = await this._classTaxService.findOne(classTaxId);
    orderTax.updatedAt = timestamp;
    orderTax.userMod = await this._userService.findOne(userId);

    // Controlo que el modelo no tenga errores antes de guardar
    const errors = await validate(orderTax);
    if (errors && errors.length > 0) {
      this._logger.debug(ERROR_MESSAGE.NO_ACEPTABLE);
      throw new NotAcceptableException(ERROR_MESSAGE.NO_ACEPTABLE);
    }

    return this._orderTaxRepository.save(orderTax);
  }

  async findPaginated(
    options: IPaginationOptions & { orderBy?: string; orderDirection?: string }
  ): Promise<Pagination<OrderTax>> {
    this._logger.debug("findPaginated()");

    return paginate<OrderTax>(this._orderTaxRepository, options, {
      where: { deleted: false },
      order: { [options.orderBy]: options.orderDirection },
    });
  }

  async findAll(): Promise<OrderTax[]> {
    this._logger.debug("findAll()");

    return this._orderTaxRepository.find({
      where: { deleted: false },
      order: { name: "ASC" },
    });
  }

  async findOne(id: number): Promise<OrderTax> {
    this._logger.debug("findOne()");

    return this._orderTaxRepository.findOne({
      where: { id },
    });
  }

  async search(value: string): Promise<OrderTax[]> {
    this._logger.debug("search()");

    return this._orderTaxRepository.find({
      where: [
        { name: ILike(`%${value}%`) },
        { description: ILike(`%${value}%`) },
      ],
    });
  }

  async delete(id: number, userId: number): Promise<void> {
    this._logger.debug("delete()");
    const timestamp: any = moment().format("YYYY-MM-DD HH:mm:ss");

    const orderTax: OrderTax = await this._orderTaxRepository.findOne({
      where: { id },
      relations: ["families"],
    });

    if (!orderTax) {
      this._logger.debug(ERROR_MESSAGE.NO_ENCONTRADO);
      throw new NotFoundException(ERROR_MESSAGE.NO_ENCONTRADO);
    }

    // Controlo referencias
    if (orderTax.families.length > 0) {
      this._logger.debug(ERROR_MESSAGE.OBJETO_REFERENCIADO);
      throw new NotFoundException(ERROR_MESSAGE.OBJETO_REFERENCIADO);
    }

    // Soft Delete
    orderTax.deleted = true;
    orderTax.updatedAt = timestamp;
    orderTax.userMod = await this._userService.findOne(userId);
    await this._orderTaxRepository.save(orderTax);

    // Hard Delete
    // await this._orderTaxRepository.remove(orderTax);
  }
}
