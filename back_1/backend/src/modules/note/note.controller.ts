import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  Res,
  UseGuards,
  UnauthorizedException,
  UseInterceptors,
  HttpStatus,
  Logger,
} from "@nestjs/common";
import { ApiResponse, ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { JwtAuthenticationGuard } from "modules/auth/guards/jwt-authentication.guard";
import { Response, Request } from "express";
import { CreateNoteDto, UpdateNoteDto } from "./note.dto";
import { Note } from "./note.entity";
import { NoteService } from "./note.service";

@ApiTags("Notas")
@Controller("note")
export class NoteController {
  constructor(
    private readonly _noteService: NoteService // private readonly _userService: UserService
  ) {}
  private readonly _logger = new Logger(NoteController.name);

  @Post()
  @UseGuards(JwtAuthenticationGuard)
  @ApiBearerAuth()
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: Note,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: "Error: Keys already in use",
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Error: Not Found",
  })
  @ApiResponse({
    status: HttpStatus.NOT_ACCEPTABLE,
    description: "Error: Not Acceptable",
  })
  async create(
    @Res({ passthrough: true }) response: Response,
    @Body() createNoteDto: CreateNoteDto
  ): Promise<Note> {
    this._logger.debug("POST: /api/note");
    response.status(HttpStatus.CREATED);
    return this._noteService.create(createNoteDto);
  }

  @Get()
  //   @UseGuards(JwtAuthenticationGuard)
  //   @ApiBearerAuth()
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({
    status: HttpStatus.OK,
    type: Note,
    isArray: true,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "Error: Unauthorized",
  })
  async findAll(
    @Res({ passthrough: true }) response: Response
  ): Promise<Note[]> {
    this._logger.debug("GET: /api/note");
    response.status(HttpStatus.OK);
    return this._noteService.findAll();
  }

  @Get(":id")
  @UseGuards(JwtAuthenticationGuard)
  @ApiBearerAuth()
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({
    status: HttpStatus.OK,
    type: Note,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Error: Not Found",
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "Error: Unauthorized",
  })
  async findOne(
    @Res({ passthrough: true }) response: Response,
    @Param("id") id: number
  ): Promise<Note> {
    this._logger.debug("GET: /api/note/:id");
    response.status(HttpStatus.OK);
    return this._noteService.findOne(id);
  }

  @Patch()
  @UseGuards(JwtAuthenticationGuard)
  @ApiBearerAuth()
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({
    status: HttpStatus.OK,
    type: Note,
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
    status: HttpStatus.UNAUTHORIZED,
    description: "Error: Unauthorized",
  })
  async update(
    @Res({ passthrough: true }) response: Response,
    @Body() updateNoteDto: UpdateNoteDto
  ): Promise<Note> {
    this._logger.debug("PATCH: /api/note");
    response.status(HttpStatus.OK);
    return this._noteService.update(updateNoteDto);
  }

  @Delete(":id")
  @UseGuards(JwtAuthenticationGuard)
  @ApiBearerAuth()
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
  ) {
    this._logger.debug("DELETE: /api/note/:id");
    // const session: IJWTPayload = request.user as IJWTPayload;
    // const user: User = await this._userService.findOne(session.sub);
    // if (!user.isAdmin) {
    // 	throw new UnauthorizedException('Not admin');
    // }
    // response.status(HttpStatus.OK);
    return this._noteService.delete(id);
  }
}
