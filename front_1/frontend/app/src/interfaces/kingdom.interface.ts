import { formatTitleCase } from "../utils/tools";
import { User } from "./user.interface";

export interface Kingdom {
  id: number;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  deleted: boolean;
  userMod: User;
}

export interface CreateKingdomDto {
  name: string;
  description?: string;
}

export interface UpdateKingdomDto extends CreateKingdomDto {
  id: number;
}

export const kingdomToString = (kingdom: Kingdom) => {
  if (kingdom.description)
    return `${kingdom.id}. ${formatTitleCase(kingdom.name)} (${
      kingdom.description
    })`;
  return `${kingdom.id}. ${formatTitleCase(kingdom.name)}`;
};
