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
import { Response, Express } from "express";
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from "@nestjs/swagger";
import { IsEmailConfirmedGuard } from "modules/auth/guards/is-email-confirmed.guard";
import { RoleGuard } from "modules/auth/guards/role.guard";
import { Role } from "modules/auth/role.enum";
import { CreateSpecimenDto, UpdateSpecimenDto } from "./specimen.dto";
import { Specimen } from "./specimen.entity";
import { SpecimenService } from "./specimen.service";
import { ERROR_MESSAGE } from "modules/utils/error-message";
import { getUserIdFromRequest } from "modules/utils/user.request";
import { RequestWithUser } from "modules/auth/request-with-user.interface";
// import { PaginatedList, PaginationDto } from "modules/utils/pagination.dto";

@ApiTags("Ejemplares")
@Controller("specimen")
export class SpecimenController {
  constructor(private readonly _specimenService: SpecimenService) {}
  private readonly _logger = new Logger(SpecimenController.name);

  @Post()
  @UseGuards(RoleGuard([Role.ADMIN]))
  @UseGuards(IsEmailConfirmedGuard())
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiBearerAuth()
  @ApiBody({
    description: "Atributos del ejemplar",
    type: CreateSpecimenDto,
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: Specimen,
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
    @Body() createSpecimenDto: CreateSpecimenDto
  ): Promise<Specimen> {
    this._logger.debug("POST: /api/specimen");
    const userId: number = getUserIdFromRequest(request);
    return this._specimenService.create(createSpecimenDto, userId);
  }

  @Patch()
  @UseGuards(RoleGuard([Role.ADMIN]))
  @UseGuards(IsEmailConfirmedGuard())
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiBearerAuth()
  @ApiBody({
    description: "Atributos del ejemplar",
    type: UpdateSpecimenDto,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: Specimen,
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
  update(
    @Req() request: RequestWithUser,
    @Res({ passthrough: true }) response: Response,
    @Body() updateSpecimenDto: UpdateSpecimenDto
  ) {
    this._logger.debug("PATCH: /api/specimen");
    const userId: number = getUserIdFromRequest(request);
    return this._specimenService.update(updateSpecimenDto, userId);
  }

  // @Get()
  // @UseInterceptors(ClassSerializerInterceptor)
  // @ApiResponse({
  //   status: HttpStatus.OK,
  //   type: Specimen,
  //   isArray: true,
  // })
  // async findAll(
  //   @Query() paginationDto: PaginationDto
  // ): Promise<PaginatedList<Specimen>> {
  //   this._logger.debug("GET: /api/specimen");
  //   return this._specimenService.findAll(paginationDto);
  // }

  @Get(":id")
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({
    status: HttpStatus.OK,
    type: Specimen,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: ERROR_MESSAGE.NO_ENCONTRADO,
  })
  async findOne(
    @Res({ passthrough: true }) response: Response,
    @Param("id") id: number
  ): Promise<Specimen> {
    this._logger.debug("GET: /api/specimen/:id");
    response.status(HttpStatus.OK);
    return this._specimenService.findOne(id);
  }

  @Delete(":id")
  @UseGuards(RoleGuard([Role.ADMIN]))
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
  async delete(
    @Req() request: RequestWithUser,
    @Res({ passthrough: true }) response: Response,
    @Param("id") id: number
  ): Promise<void> {
    this._logger.debug("DELETE: /api/specimen/:id");
    const userId: number = getUserIdFromRequest(request);
    return this._specimenService.delete(id, userId);
  }
}
