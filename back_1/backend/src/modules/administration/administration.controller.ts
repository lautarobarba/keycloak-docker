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

import { AdministrationService } from "./administration.service";
import { ERROR_MESSAGE } from "modules/utils/error-message";
import { RequestWithUser } from "modules/auth/request-with-user.interface";
import { getUserIdFromRequest } from "modules/utils/user.request";
import { Pagination } from "nestjs-typeorm-paginate";
import { PaginationDto } from "modules/utils/pagination.dto";
import { Kingdom } from "modules/kingdom/kingdom.entity";
import { Family } from "modules/family/family.entity";
import { GlobalSearchDto } from "./administration.dto";
import { Phylum } from "modules/phylum/phylum.entity";

@ApiTags("Administración")
@Controller("administration")
export class AdministrationController {
  constructor(private readonly _administrationService: AdministrationService) {}
  private readonly _logger = new Logger(AdministrationController.name);

  @Get("global-search")
  @UseInterceptors(ClassSerializerInterceptor)
  async globalSearch(@Query() globalSearchDto: GlobalSearchDto): Promise<{
    kingdoms: Kingdom[];
    phylums: Phylum[];
    families: Family[];
  }> {
    this._logger.debug("GET: /api/administration/global-search");
    return this._administrationService.globalSearch(globalSearchDto.value);
  }

  // Otras funciones para obtener estadísticas
}
