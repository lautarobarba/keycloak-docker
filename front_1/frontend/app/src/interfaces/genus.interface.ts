import { formatTitleCase } from "../utils/tools";
import { Family } from "./family.interface";
import { User } from "./user.interface";

export interface Genus {
  id: number;
  name: string;
  description: string;
  family: Family;
  createdAt: Date;
  updatedAt: Date;
  deleted: boolean;
  userMod: User;
}

export interface CreateGenusDto {
  name: string;
  description?: string;
  familyId: number;
}

export interface UpdateGenusDto extends CreateGenusDto {
  id: number;
}

export const genusToString = (genus: Genus) => {
  if (genus.description)
    return `${genus.id}. ${formatTitleCase(genus.name)} (${genus.description})`;
  return `${genus.id}. ${formatTitleCase(genus.name)}`;
};
