import { Species } from "./species.interface";

export interface Specimen {
  id: number;
  name: string;
  description: string;
  species: Species;
  coordLat: string;
  coordLon: string;
  createdAt: Date;
  updatedAt: Date;
  deleted: boolean;
}

export interface CreateSpecimenDto {
  name: string;
  description?: string;
  speciesId: number;
  coordLat?: string;
  coordLon?: string;
}

export interface UpdateSpecimenDto {
  id: number;
  name?: string;
  description?: string;
  speciesId?: number;
  coordLat?: string;
  coordLon?: string;
}
