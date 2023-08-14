import {
  ConflictException,
  Injectable,
  Logger,
  NotAcceptableException,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Not, Repository } from "typeorm";
import * as moment from "moment";
import { validate } from "class-validator";
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from "nestjs-typeorm-paginate";
import { ERROR_MESSAGE } from "modules/utils/error-message";
import { UserService } from "modules/user/user.service";
import { KingdomService } from "modules/kingdom/kingdom.service";
import { FamilyService } from "modules/family/family.service";
import { Kingdom } from "modules/kingdom/kingdom.entity";
import { Family } from "modules/family/family.entity";
import { Phylum } from "modules/phylum/phylum.entity";
import { PhylumService } from "modules/phylum/phylum.service";

@Injectable()
export class AdministrationService {
  constructor(
    private readonly _userService: UserService,
    private readonly _kingdomService: KingdomService,
    private readonly _phylumService: PhylumService,
    private readonly _familyService: FamilyService
  ) {}
  private readonly _logger = new Logger(AdministrationService.name);

  async globalSearch(
    value: string
  ): Promise<{ kingdoms: Kingdom[]; phylums: Phylum[]; families: Family[] }> {
    this._logger.debug("globalSearch()");

    // Buscar en todas las entidades usando value
    const kingdoms: Kingdom[] = await this._kingdomService.search(value);
    const families: Family[] = await this._familyService.search(value);
    const phylums: Phylum[] = await this._phylumService.search(value);

    return { kingdoms, phylums, families };
  }
}
