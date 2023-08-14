import {
  ConflictException,
  Injectable,
  Logger,
  NotAcceptableException,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import * as moment from "moment";
import { validate } from "class-validator";
import { SpeciesService } from "modules/species/species.service";
import { Repository } from "typeorm";
import { CreateSpecimenDto, UpdateSpecimenDto } from "./specimen.dto";
import { Specimen } from "./specimen.entity";
import { ERROR_MESSAGE } from "modules/utils/error-message";
// import { PaginatedList, PaginationDto } from "modules/utils/pagination.dto";

@Injectable()
export class SpecimenService {
  constructor(
    @InjectRepository(Specimen)
    private readonly _specimenRepository: Repository<Specimen>,
    private readonly _speciesService: SpeciesService
  ) {}
  private readonly _logger = new Logger(SpecimenService.name);

  async create(
    createSpecimenDto: CreateSpecimenDto,
    userId: number
  ): Promise<Specimen> {
    // TODO: falta guardar imagenes
    this._logger.debug("create()");
    const { name, description, speciesId, coordLat, coordLon } =
      createSpecimenDto;
    const timestamp: any = moment().format("YYYY-MM-DD HH:mm:ss");

    // Controlo que el nuevo ejemplar no exista
    const exists: Specimen = await this._specimenRepository.findOne({
      where: { name: name.toLowerCase() },
    });

    // Si existe y no esta borrado lógico entonces hay conflictos
    if (exists && !exists.deleted) {
      this._logger.debug(ERROR_MESSAGE.CLAVE_PRIMARIA_EN_USO);
      throw new ConflictException(ERROR_MESSAGE.CLAVE_PRIMARIA_EN_USO);
    }

    // Si no existe entonces creo uno nuevo
    const specimen: Specimen = this._specimenRepository.create();
    specimen.name = name.toLowerCase();
    specimen.description = description.toLowerCase();
    if (speciesId && speciesId !== 0)
      specimen.species = await this._speciesService.findOne(speciesId);
    else specimen.species = null;
    specimen.coordLat = coordLat;
    specimen.coordLon = coordLon;
    specimen.createdAt = timestamp;
    specimen.updatedAt = timestamp;
    specimen.deleted = false;

    // Controlo que el modelo no tenga errores antes de guardar
    const errors = await validate(specimen);
    if (errors && errors.length > 0) {
      this._logger.debug(ERROR_MESSAGE.NO_ACEPTABLE);
      throw new NotAcceptableException(ERROR_MESSAGE.NO_ACEPTABLE);
    }

    return this._specimenRepository.save(specimen);
  }

  async update(
    updateSpecimenDto: UpdateSpecimenDto,
    userId: number
  ): Promise<Specimen> {
    this._logger.debug("update()");
    const { id, name, description, speciesId, coordLat, coordLon } =
      updateSpecimenDto;
    const timestamp: any = moment().format("YYYY-MM-DD HH:mm:ss");

    const specimen: Specimen = await this._specimenRepository.findOne({
      where: { id },
    });

    if (!specimen) {
      this._logger.debug(ERROR_MESSAGE.NO_ENCONTRADO);
      throw new NotFoundException(ERROR_MESSAGE.NO_ENCONTRADO);
    }

    // Controlo que las claves no estén en uso
    if (name) {
      const exists: Specimen = await this._specimenRepository.findOne({
        where: { name: name.toLowerCase() },
      });

      // Si existe y no esta borrado lógico entonces hay conflictos
      if (exists && !exists.deleted && exists.id !== id) {
        this._logger.debug(ERROR_MESSAGE.CLAVE_PRIMARIA_EN_USO);
        throw new ConflictException(ERROR_MESSAGE.CLAVE_PRIMARIA_EN_USO);
      }
    }

    // Si no hay problemas actualizo los atributos
    if (name) specimen.name = name.toLowerCase();
    if (description) specimen.description = description.toLowerCase();
    if (speciesId && speciesId !== 0)
      specimen.species = await this._speciesService.findOne(speciesId);
    else specimen.species = null;
    if (coordLat) specimen.coordLat = coordLat;
    if (coordLon) specimen.coordLon = coordLon;
    specimen.updatedAt = timestamp;

    // Controlo que el modelo no tenga errores antes de guardar
    const errors = await validate(specimen);
    if (errors && errors.length > 0) {
      this._logger.debug(ERROR_MESSAGE.NO_ACEPTABLE);
      throw new NotAcceptableException(ERROR_MESSAGE.NO_ACEPTABLE);
    }

    return this._specimenRepository.save(specimen);
  }

  // async findAll(
  //   paginationDto: PaginationDto
  // ): Promise<PaginatedList<Specimen>> {
  //   this._logger.debug("findAll()");
  //   const { paginationState, sortingState, columnFiltersState } = paginationDto;

  //   const tieneFiltros: boolean =
  //     columnFiltersState && columnFiltersState.length > 0 ? true : false;
  //   const tienePaginado: boolean =
  //     paginationState && paginationState.pageSize && paginationState.pageIndex
  //       ? true
  //       : false;
  //   const tieneOrdenamiento: boolean =
  //     sortingState && sortingState.length > 0 ? true : false;

  //   // Preparo filtros
  //   let where: any = {};

  //   // Preparo paginado
  //   const count: number = await this._specimenRepository.count({
  //     where: where,
  //   }); // COUNT(*)
  //   let skip: number = 0;
  //   let take: number = count;
  //   let pageCount: number = 1;
  //   if (tienePaginado) {
  //     skip = paginationState.pageIndex * paginationState.pageSize;
  //     take = paginationState.pageSize;
  //     pageCount = Math.ceil(count / paginationState.pageSize);
  //   }

  //   // Preparo ordenamiento
  //   let order: any = {};
  //   if (tieneOrdenamiento) {
  //     sortingState.map((field: any) => {
  //       if (field.id.split(".").length === 1) {
  //         // console.log('Es una prop de la entidad');
  //         order = {
  //           ...order,
  //           [field.id]: field.desc === "true" ? "DESC" : "ASC",
  //         };
  //         // console.log({[field.id]: field.desc ? 'DESC' : 'ASC' });
  //       } else if (field.id.split(".").length === 2) {
  //         // console.log('Es una prop de relacion');
  //         const [relacion, attributo] = field.id.split(".");
  //         order = {
  //           ...order,
  //           [relacion]: { [attributo]: field.desc === "true" ? "DESC" : "ASC" },
  //         };
  //         // console.log({ ...order, [relacion]: { [attributo]: field.desc === 'true' ? 'DESC' : 'ASC' } });
  //       } else if (field.id.split(".").length === 3) {
  //         console.log("Es una prop de relacion de relacion");
  //         const [relacion1, relacion2, attributo] = field.id.split(".");
  //         order = {
  //           ...order,
  //           [relacion1]: {
  //             [relacion2]: {
  //               [attributo]: field.desc === "true" ? "DESC" : "ASC",
  //             },
  //           },
  //         };
  //         // console.log({ ...order, [relacion1]: { [relacion2]: { [attributo]: field.desc === 'true' ? 'DESC' : 'ASC' } } });
  //       }
  //     });
  //   }
  //   // Si no tiene la prop id entonces agrego id: 'DESC' por default
  //   if (order.id === undefined) order = { ...order, id: "DESC" };
  //   // console.log(order);

  //   // Busco los ejemplares utilizando todos los filtros
  //   const ejemplares: Specimen[] = await this._specimenRepository.find({
  //     where: where,
  //     order: order,
  //     skip: skip,
  //     take: take,
  //   });

  //   const paginatedList: PaginatedList<Specimen> = {
  //     pageCount: pageCount,
  //     rows: ejemplares,
  //   };

  //   return paginatedList;
  // }

  async findOne(id: number): Promise<Specimen> {
    this._logger.debug("findOne()");
    return this._specimenRepository.findOne({
      where: { id },
    });
  }

  async delete(id: number, userId: number): Promise<void> {
    this._logger.debug("delete()");
    const timestamp: any = moment().format("YYYY-MM-DD HH:mm:ss");

    const specimen: Specimen = await this._specimenRepository.findOne({
      where: { id },
    });

    if (!specimen) {
      this._logger.debug(ERROR_MESSAGE.NO_ENCONTRADO);
      throw new NotFoundException(ERROR_MESSAGE.NO_ENCONTRADO);
    }

    // Soft Delete
    // specimen.deleted = true;
    // specimen.updatedAt = timestamp;
    // await this._specimenRepository.save(specimen);

    // Hard Delete
    await this._specimenRepository.remove(specimen);
  }
}
