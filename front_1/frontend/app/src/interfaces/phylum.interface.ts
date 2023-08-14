import { formatTitleCase } from "../utils/tools";
import { Kingdom } from "./kingdom.interface";
import { User } from "./user.interface";

export interface Phylum {
  id: number;
  name: string;
  description: string;
  kingdom: Kingdom;
  createdAt: Date;
  updatedAt: Date;
  deleted: boolean;
  userMod: User;
}

export interface CreatePhylumDto {
  name: string;
  description?: string;
  kingdomId: number;
}

export interface UpdatePhylumDto extends CreatePhylumDto {
  id: number;
}

export const phylumToString = (phylum: Phylum) => {
  if (phylum.description)
    return `${phylum.id}. ${formatTitleCase(phylum.name)} (${
      phylum.description
    })`;
  return `${phylum.id}. ${formatTitleCase(phylum.name)}`;
};
