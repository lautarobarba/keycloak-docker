import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Logger,
  Param,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { ApiBearerAuth, ApiResponse, ApiTags } from "@nestjs/swagger";
import { IsEmailConfirmedGuard } from "modules/auth/guards/is-email-confirmed.guard";
import { RoleGuard } from "modules/auth/guards/role.guard";
import { Role } from "modules/auth/role.enum";
import { CreateQRCodeDto, UpdateQRCodeDto } from "./qr-code.dto";
import { QRCode } from "./qr-code.entity";
import { QRCodeService } from "./qr-code.service";

@ApiTags("Códigos QR")
@Controller("qr-code")
export class QRCodeController {
  constructor(private readonly _qRCodeService: QRCodeService) {}
  private readonly _logger = new Logger(QRCodeController.name);

  @Post()
  @UseGuards(RoleGuard([Role.ADMIN]))
  @UseGuards(IsEmailConfirmedGuard())
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: QRCode,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "Error: Unauthorized",
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: "Error: Keys already in use",
  })
  @ApiResponse({
    status: HttpStatus.NOT_ACCEPTABLE,
    description: "Error: Not Acceptable",
  })
  async create(@Body() createQRCodeDto: CreateQRCodeDto): Promise<void> {
    this._logger.debug("POST: /api/qr-code");
    return this._qRCodeService.create(createQRCodeDto);
  }

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({
    status: HttpStatus.OK,
    type: QRCode,
    isArray: true,
  })
  async findAll(): Promise<QRCode[]> {
    this._logger.debug("GET: /api/qr-code");
    return this._qRCodeService.findAll();
  }

  @Patch()
  @UseGuards(RoleGuard([Role.ADMIN]))
  @UseGuards(IsEmailConfirmedGuard())
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.OK,
    type: QRCode,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "Error: Unauthorized",
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Error: Not Found",
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: "Error: Keys already in use",
  })
  @ApiResponse({
    status: HttpStatus.NOT_ACCEPTABLE,
    description: "Error: Not Acceptable",
  })
  async update(@Body() updateQRCodeDto: UpdateQRCodeDto): Promise<void> {
    this._logger.debug("PATCH: /api/qr-code");
    return this._qRCodeService.update(updateQRCodeDto);
  }

  @Get(":id")
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({
    status: HttpStatus.OK,
    type: QRCode,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Error: Not Found",
  })
  async findOne(@Param("id") id: number): Promise<QRCode> {
    this._logger.debug("GET: /api/genus/:id");
    return this._qRCodeService.findOne(id);
  }

  @Delete(":id")
  @UseGuards(RoleGuard([Role.ADMIN]))
  @UseGuards(IsEmailConfirmedGuard())
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "Error: Unauthorized",
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Error: Not Found",
  })
  async delete(@Param("id") id: number) {
    this._logger.debug("DELETE: /api/genus/:id");
    return this._qRCodeService.delete(id);
  }
}
