import { formatTitleCase } from "../utils/tools";
import { Genus } from "./genus.interface";
import { Picture } from "./picture.interface";
import { User } from "./user.interface";

export enum OrganismType {
  TREE = "TREE", // ARBOL = "ARBOL",
  BUSH = "BUSH", // ARBUSTO = "ARBUSTO"
  SUBSHRUB = "SUBSHRUB", // SUBARBUSTO = "SUBARBUSTO"
  FUNGUS = "FUNGUS", // HONGO = "HONGO"
  GRASS = "GRASS", // HIERBA = "HIERBA"
  LICHEN = "LICHEN", // LIQUEN = "LIQUEN"
  HEMIPARASITE_SUBSHRUB = "HEMIPARASITE_SUBSHRUB", // SUBARBUSTO_HEMIPARÁSITO = "SUBARBUSTO_HEMIPARÁSITO"
}

export enum Status {
  NATIVE = "NATIVE", // NATIVA = "NATIVA",
  ENDEMIC = "ENDEMIC", // ENDEMICA = "ENDEMICA",
  INTRODUCED = "INTRODUCED", // INTRODUCIDA = "INTRODUCIDA",
}

export enum FoliageType {
  PERENNIAL = "PERENNIAL", // PERENNE = "PERENNE",
  DECIDUOUS = "DECIDUOUS", // CADUCIFOLIA = "CADUCIFOLIA",
}

export enum Presence {
  PRESENT = "PRESENT", // PRESENTE = "PRESENTE",
  ABSENT = "ABSENT", // AUSENTE = "AUSENTE",
}

export interface Species {
  id: number;
  scientificName: string;
  commonName: string;
  englishName: string;
  description: string;
  genus: Genus;
  organismType: OrganismType;
  status: Status;
  foliageType: FoliageType;
  presence: Presence;
  // exampleImg?: Picture;
  // foliageImg?: Picture;
  createdAt: Date;
  updatedAt: Date;
  deleted: boolean;
  userMod: User;
}

export interface CreateSpeciesDto {
  scientificName: string;
  commonName?: string;
  englishName?: string;
  description?: string;
  genusId: number;
  organismType: OrganismType;
  status: Status;
  foliageType: FoliageType;
  presence: Presence;
  exampleImg?: Picture | null;
  // files?: { exampleImg?: Picture | null; foliageImg?: Picture | null };
}

export interface UpdateSpeciesDto extends CreateSpeciesDto {
  id: number;
  exampleImg?: Picture | null;
}

export const speciesToString = (species: Species) => {
  let name = `${species.id}. ${formatTitleCase(species.scientificName)}`;

  if (species.commonName) {
    if (species.englishName) {
      name = `${name} (${species.commonName}-${species.englishName})`;
    } else {
      name = `${name} (${species.commonName})`;
    }
  }

  return name;
};
