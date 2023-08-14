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
import { CreateKingdomDto, UpdateKingdomDto } from "./kingdom.dto";
import { Kingdom } from "./kingdom.entity";
import { KingdomService } from "./kingdom.service";
import { ERROR_MESSAGE } from "modules/utils/error-message";
import { RequestWithUser } from "modules/auth/request-with-user.interface";
import { getUserIdFromRequest } from "modules/utils/user.request";
import { Pagination } from "nestjs-typeorm-paginate";
import { PaginationDto } from "modules/utils/pagination.dto";

@ApiTags("Reino")
@Controller("kingdom")
export class KingdomController {
  constructor(private readonly _kingdomService: KingdomService) {}
  private readonly _logger = new Logger(KingdomController.name);

  @Post()
  @UseGuards(RoleGuard([Role.ADMIN, Role.EDITOR]))
  @UseGuards(IsEmailConfirmedGuard())
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiBearerAuth()
  @ApiBody({
    description: "Atributos del reino",
    type: CreateKingdomDto,
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: Kingdom,
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
    @Body() createKingdomDto: CreateKingdomDto
  ): Promise<Kingdom> {
    this._logger.debug("POST: /api/kingdom");
    const userId: number = getUserIdFromRequest(request);
    return this._kingdomService.create(createKingdomDto, userId);
  }

  @Patch()
  @UseGuards(RoleGuard([Role.ADMIN, Role.EDITOR]))
  @UseGuards(IsEmailConfirmedGuard())
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiBearerAuth()
  @ApiBody({
    description: "Atributos del reino",
    type: UpdateKingdomDto,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: Kingdom,
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
    @Body() updateKingdomDto: UpdateKingdomDto
  ): Promise<Kingdom> {
    this._logger.debug("PATCH: /api/kingdom");
    const userId: number = getUserIdFromRequest(request);
    return this._kingdomService.update(updateKingdomDto, userId);
  }

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({
    status: HttpStatus.OK,
    type: Kingdom,
    isArray: true,
  })
  async findAll(
    @Query() paginationDto: PaginationDto
  ): Promise<Pagination<Kingdom> | Kingdom[]> {
    this._logger.debug("GET: /api/kingdom");
    if (paginationDto.page && paginationDto.limit) {
      return this._kingdomService.findPaginated({
        page: paginationDto.page,
        limit: paginationDto.limit,
        orderBy: paginationDto.orderBy,
        orderDirection: paginationDto.orderDirection,
        route: `${process.env.API_URL}/api/kingdom`,
      });
    } else {
      return this._kingdomService.findAll();
    }
  }

  @Get(":id")
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({
    status: HttpStatus.OK,
    type: Kingdom,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: ERROR_MESSAGE.NO_ENCONTRADO,
  })
  async findOne(
    @Res({ passthrough: true }) response: Response,
    @Param("id") id: number
  ): Promise<Kingdom> {
    this._logger.debug("GET: /api/kingdom/:id");
    response.status(HttpStatus.OK);
    return this._kingdomService.findOne(id);
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
    this._logger.debug("DELETE: /api/kingdom/:id");
    const userId: number = getUserIdFromRequest(request);
    return this._kingdomService.delete(id, userId);
  }
}
