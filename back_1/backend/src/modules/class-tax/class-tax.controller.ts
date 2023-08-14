import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  ClassSerializerInterceptor,
  HttpStatus,
  Req,
  Res,
  Logger,
  UseGuards,
  Query,
} from "@nestjs/common";
import { Response } from "express";
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from "@nestjs/swagger";
import { IsEmailConfirmedGuard } from "modules/auth/guards/is-email-confirmed.guard";
import { RoleGuard } from "modules/auth/guards/role.guard";
import { Role } from "modules/auth/role.enum";
import { CreateClassTaxDto, UpdateClassTaxDto } from "./class-tax.dto";
import { ClassTax } from "./class-tax.entity";
import { ClassTaxService } from "./class-tax.service";
import { ERROR_MESSAGE } from "modules/utils/error-message";
import { RequestWithUser } from "modules/auth/request-with-user.interface";
import { getUserIdFromRequest } from "modules/utils/user.request";
import { Pagination } from "nestjs-typeorm-paginate";
import { PaginationDto } from "modules/utils/pagination.dto";

@ApiTags("Clase")
@Controller("class-tax")
export class ClassTaxController {
  constructor(private readonly _classTaxService: ClassTaxService) {}
  private readonly _logger = new Logger(ClassTaxController.name);

  @Post()
  @UseGuards(RoleGuard([Role.ADMIN, Role.EDITOR]))
  @UseGuards(IsEmailConfirmedGuard())
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiBearerAuth()
  @ApiBody({
    description: "Atributos de la clase",
    type: CreateClassTaxDto,
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: ClassTax,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: ERROR_MESSAGE.FALTAN_PERMISOS,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: ERROR_MESSAGE.CLAVE_PRIMARIA_EN_USO,
  })
  @ApiResponse({
    status: HttpStatus.NOT_ACCEPTABLE,
    description: ERROR_MESSAGE.NO_ACEPTABLE,
  })
  async create(
    @Req() request: RequestWithUser,
    @Res({ passthrough: true }) response: Response,
    @Body() createClassTaxDto: CreateClassTaxDto
  ): Promise<ClassTax> {
    this._logger.debug("POST: /api/class-tax");
    const userId: number = getUserIdFromRequest(request);
    return this._classTaxService.create(createClassTaxDto, userId);
  }

  @Patch()
  @UseGuards(RoleGuard([Role.ADMIN, Role.EDITOR]))
  @UseGuards(IsEmailConfirmedGuard())
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiBearerAuth()
  @ApiBody({
    description: "Atributos de la clase",
    type: UpdateClassTaxDto,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: ClassTax,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: ERROR_MESSAGE.FALTAN_PERMISOS,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: ERROR_MESSAGE.NO_ENCONTRADO,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: ERROR_MESSAGE.CLAVE_PRIMARIA_EN_USO,
  })
  @ApiResponse({
    status: HttpStatus.NOT_ACCEPTABLE,
    description: ERROR_MESSAGE.NO_ACEPTABLE,
  })
  async update(
    @Req() request: RequestWithUser,
    @Res({ passthrough: true }) response: Response,
    @Body() updateClassTaxDto: UpdateClassTaxDto
  ): Promise<ClassTax> {
    this._logger.debug("PATCH: /api/class-tax");
    const userId: number = getUserIdFromRequest(request);
    return this._classTaxService.update(updateClassTaxDto, userId);
  }

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({
    status: HttpStatus.OK,
    type: ClassTax,
    isArray: true,
  })
  async findAll(
    @Query() paginationDto: PaginationDto
  ): Promise<Pagination<ClassTax> | ClassTax[]> {
    this._logger.debug("GET: /api/class-tax");
    if (paginationDto.page && paginationDto.limit) {
      return this._classTaxService.findPaginated({
        page: paginationDto.page,
        limit: paginationDto.limit,
        orderBy: paginationDto.orderBy,
        orderDirection: paginationDto.orderDirection,
        route: `${process.env.API_URL}/api/class-tax`,
      });
    } else {
      return this._classTaxService.findAll();
    }
  }

  @Get(":id")
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({
    status: HttpStatus.OK,
    type: ClassTax,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: ERROR_MESSAGE.NO_ENCONTRADO,
  })
  async findOne(
    @Res({ passthrough: true }) response: Response,
    @Param("id") id: number
  ): Promise<ClassTax> {
    this._logger.debug("GET: /api/class-tax/:id");
    response.status(HttpStatus.OK);
    return this._classTaxService.findOne(id);
  }

  @Delete(":id")
  @UseGuards(RoleGuard([Role.ADMIN, Role.EDITOR]))
  @UseGuards(IsEmailConfirmedGuard())
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: ERROR_MESSAGE.FALTAN_PERMISOS,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: ERROR_MESSAGE.NO_ENCONTRADO,
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: ERROR_MESSAGE.OBJETO_REFERENCIADO,
  })
  async delete(
    @Req() request: RequestWithUser,
    @Res({ passthrough: true }) response: Response,
    @Param("id") id: number
  ): Promise<void> {
    this._logger.debug("DELETE: /api/class-tax/:id");
    const userId: number = getUserIdFromRequest(request);
    return this._classTaxService.delete(id, userId);
  }
}
