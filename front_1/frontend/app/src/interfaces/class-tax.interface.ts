import { formatTitleCase } from "../utils/tools";
import { Phylum } from "./phylum.interface";
import { User } from "./user.interface";

export interface ClassTax {
  id: number;
  name: string;
  description: string;
  phylum: Phylum;
  createdAt: Date;
  updatedAt: Date;
  deleted: boolean;
  userMod: User;
}

export interface CreateClassTaxDto {
  name: string;
  description?: string;
  phylumId: number;
}

export interface UpdateClassTaxDto extends CreateClassTaxDto {
  id: number;
}

export const classTaxToString = (classTax: ClassTax) => {
  if (classTax.description)
    return `${classTax.id}. ${formatTitleCase(classTax.name)} (${
      classTax.description
    })`;
  return `${classTax.id}. ${formatTitleCase(classTax.name)}`;
};
