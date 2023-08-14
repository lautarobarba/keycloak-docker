import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Patch,
  Delete,
  Param,
  Body,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
  HttpStatus,
  UnauthorizedException,
  UploadedFile,
  StreamableFile,
  BadRequestException,
  Logger,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { Response, Request, Express } from "express";
import { UpdateUserDto } from "./user.dto";
import { User } from "./user.entity";
import { UserService } from "./user.service";
import { RoleGuard } from "modules/auth/guards/role.guard";
import { Role } from "../auth/role.enum";
import { IsEmailConfirmedGuard } from "modules/auth/guards/is-email-confirmed.guard";
import { createReadStream } from "fs";
import { join } from "path";

@Controller("user")
@ApiTags("Usuarios")
export class UserController {
  constructor(private readonly _userService: UserService) {}
  private readonly _logger = new Logger(UserController.name);

  @Get()
  @UseGuards(RoleGuard([Role.ADMIN]))
  @UseGuards(IsEmailConfirmedGuard())
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.OK,
    type: User,
    isArray: true,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "Error: Unauthorized",
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: "Error: Forbidden",
  })
  async findAll(): Promise<User[]> {
    this._logger.debug("GET: /api/user");
    return this._userService.findAll();
  }

  @Patch()
  @UseGuards(IsEmailConfirmedGuard())
  @UseInterceptors(ClassSerializerInterceptor)
  // @UseInterceptors(LocalFilesInterceptor({
  // 	fieldName: 'profilePicture',
  // 	path: '/temp',
  // 	fileFilter: (request, file, callback) => {
  // 		if (!file.mimetype.includes('image')) {
  // 			return callback(new BadRequestException('Invalid image file'), false);
  // 		}
  // 		callback(null, true);
  // 	},
  // 	limits: {
  // 		fileSize: (1024 * 1024 * 10) // 10MB
  // 	}
  // }))
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    description: "User attributes",
    type: UpdateUserDto,
  })
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.OK,
    type: User,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Error: Not Found",
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "Error: Unauthorized",
  })
  @ApiResponse({
    status: HttpStatus.PAYLOAD_TOO_LARGE,
    description: "Error: Payload Too Large",
  })
  async update(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
    @Body() updateUserDto: UpdateUserDto,
    @UploadedFile() profilePicture?: Express.Multer.File
  ): Promise<User> {
    this._logger.debug("PATCH: /api/user");
    // Sólo administradores y propietarios pueden editar
    const user: User = await this._userService.getUserFromRequest(request);

    if (user.role !== Role.ADMIN && user.id != updateUserDto.id)
      throw new UnauthorizedException("Not allow");

    // Agrego la foto de perfil al DTO para enviarlo al service
    updateUserDto.profilePicture = profilePicture;

    return this._userService.update(updateUserDto);
  }

  @Get(":id")
  @UseGuards(IsEmailConfirmedGuard())
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.OK,
    type: User,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Error: Not Found",
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "Error: Unauthorized",
  })
  async findOne(@Param("id") id: number): Promise<User> {
    this._logger.debug("GET: /api/user/:id");
    return this._userService.findOne(id);
  }

  @Delete(":id")
  @UseGuards(RoleGuard([Role.ADMIN]))
  @UseGuards(IsEmailConfirmedGuard())
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.OK,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Error: Not Found",
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "Error: Unauthorized",
  })
  async delete(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
    @Param("id") id: number
  ): Promise<void> {
    this._logger.debug("DELETE: /api/user/:id");
    return this._userService.delete(id);
  }
}
