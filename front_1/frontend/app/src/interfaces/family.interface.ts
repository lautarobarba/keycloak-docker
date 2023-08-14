import { formatTitleCase } from "../utils/tools";
import { OrderTax } from "./order-tax.interface";
import { User } from "./user.interface";

export interface Family {
  id: number;
  name: string;
  description: string;
  orderTax: OrderTax;
  createdAt: Date;
  updatedAt: Date;
  deleted: boolean;
  userMod: User;
}

export interface CreateFamilyDto {
  name: string;
  description?: string;
  orderTaxId: number;
}

export interface UpdateFamilyDto extends CreateFamilyDto {
  id: number;
}

export const familyToString = (family: Family) => {
  if (family.description)
    return `${family.id}. ${formatTitleCase(family.name)} (${
      family.description
    })`;
  return `${family.id}. ${formatTitleCase(family.name)}`;
};
