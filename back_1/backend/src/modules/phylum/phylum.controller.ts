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
import { CreatePhylumDto, UpdatePhylumDto } from "./phylum.dto";
import { Phylum } from "./phylum.entity";
import { PhylumService } from "./phylum.service";
import { ERROR_MESSAGE } from "modules/utils/error-message";
import { RequestWithUser } from "modules/auth/request-with-user.interface";
import { getUserIdFromRequest } from "modules/utils/user.request";
import { Pagination } from "nestjs-typeorm-paginate";
import { PaginationDto } from "modules/utils/pagination.dto";

@ApiTags("Filo")
@Controller("phylum")
export class PhylumController {
  constructor(private readonly _phylumService: PhylumService) {}
  private readonly _logger = new Logger(PhylumController.name);

  @Post()
  @UseGuards(RoleGuard([Role.ADMIN, Role.EDITOR]))
  @UseGuards(IsEmailConfirmedGuard())
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiBearerAuth()
  @ApiBody({
    description: "Atributos del filo",
    type: CreatePhylumDto,
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: Phylum,
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
    @Body() createPhylumDto: CreatePhylumDto
  ): Promise<Phylum> {
    this._logger.debug("POST: /api/phylum");
    const userId: number = getUserIdFromRequest(request);
    return this._phylumService.create(createPhylumDto, userId);
  }

  @Patch()
  @UseGuards(RoleGuard([Role.ADMIN, Role.EDITOR]))
  @UseGuards(IsEmailConfirmedGuard())
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiBearerAuth()
  @ApiBody({
    description: "Atributos del filo",
    type: UpdatePhylumDto,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: Phylum,
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
    @Body() updatePhylumDto: UpdatePhylumDto
  ): Promise<Phylum> {
    this._logger.debug("PATCH: /api/phylum");
    const userId: number = getUserIdFromRequest(request);
    return this._phylumService.update(updatePhylumDto, userId);
  }

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({
    status: HttpStatus.OK,
    type: Phylum,
    isArray: true,
  })
  async findAll(
    @Query() paginationDto: PaginationDto
  ): Promise<Pagination<Phylum> | Phylum[]> {
    this._logger.debug("GET: /api/phylum");
    if (paginationDto.page && paginationDto.limit) {
      return this._phylumService.findPaginated({
        page: paginationDto.page,
        limit: paginationDto.limit,
        orderBy: paginationDto.orderBy,
        orderDirection: paginationDto.orderDirection,
        route: `${process.env.API_URL}/api/phylum`,
      });
    } else {
      return this._phylumService.findAll();
    }
  }

  @Get(":id")
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({
    status: HttpStatus.OK,
    type: Phylum,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: ERROR_MESSAGE.NO_ENCONTRADO,
  })
  async findOne(
    @Res({ passthrough: true }) response: Response,
    @Param("id") id: number
  ): Promise<Phylum> {
    this._logger.debug("GET: /api/phylum/:id");
    response.status(HttpStatus.OK);
    return this._phylumService.findOne(id);
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
    this._logger.debug("DELETE: /api/phylum/:id");
    const userId: number = getUserIdFromRequest(request);
    return this._phylumService.delete(id, userId);
  }
}
