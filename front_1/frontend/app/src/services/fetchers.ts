import Axios from "axios";
import Cookies from "js-cookie";
import { Pagination, PaginatedList } from "../interfaces/pagination.interface";
import { LoginUserDto, SessionDto } from "../interfaces/auth.interface";
import {
  User,
  CreateUserDto,
  UpdateUserDto,
} from "../interfaces/user.interface";
import {
  CreateSpeciesDto,
  Species,
  UpdateSpeciesDto,
} from "../interfaces/species.interface";
import {
  CreateSpecimenDto,
  Specimen,
  UpdateSpecimenDto,
} from "../interfaces/specimen.interface";
import {
  Family,
  CreateFamilyDto,
  UpdateFamilyDto,
} from "../interfaces/family.interface";
import {
  CreateGenusDto,
  Genus,
  UpdateGenusDto,
} from "../interfaces/genus.interface";
import {
  CreateKingdomDto,
  Kingdom,
  UpdateKingdomDto,
} from "../interfaces/kingdom.interface";
import {
  CreatePhylumDto,
  Phylum,
  UpdatePhylumDto,
} from "../interfaces/phylum.interface";
import {
  ClassTax,
  CreateClassTaxDto,
  UpdateClassTaxDto,
} from "../interfaces/class-tax.interface";
import {
  CreateOrderTaxDto,
  OrderTax,
  UpdateOrderTaxDto,
} from "../interfaces/order-tax.interface";

// Api Url
const apiBaseUrl: string =
  process.env.NEXT_PUBLIC_API_ROUTE ?? "http://ERROR/api";

// Client to fetch
const axiosClient = Axios.create({
  baseURL: `${apiBaseUrl}/api/`,
  timeout: 10 * 1000, // 10 sec
  withCredentials: true, // Cookies
});

// # Mutations ----------------------------------------------------------------
// ## Users
export const registerUser = async (params: {
  createUserDto: CreateUserDto;
}): Promise<SessionDto> => {
  const { createUserDto } = params;
  return axiosClient
    .post("auth/register", createUserDto)
    .then((response) => response.data);
};

export const login = async (
  loginUserDto: LoginUserDto
): Promise<SessionDto> => {
  return axiosClient
    .post("auth/login", loginUserDto)
    .then((response) => response.data);
};

// export const updateUser = async (params: {
//   updateUserDto: UpdateUserDto;
//   token: string;
// }): Promise<User> => {
//   const { updateUserDto, token } = params;
//   console.log({
//     MSG: "AXIOS PATCH",
//     updateUserDto,
//   });
//   return axiosClient
//     .patch("user", updateUserDto, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "multipart/form-data",
//       },
//     })
//     .then((response) => response.data);
// };

export const logout = async (): Promise<void> => {
  const token = Cookies.get("accessToken");
  return axiosClient
    .post("auth/logout", null, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => response.data);
};

// export const sendEmailConfirmationEmail = async (
//   token: string
// ): Promise<void> => {
//   return axiosClient
//     .post("auth/email-confirmation/send", null, {
//       headers: { Authorization: `Bearer ${token}` },
//     })
//     .then((response) => response.data);
// };

// export const confirmEmail = async (token: string): Promise<void> => {
//   return axiosClient
//     .post("auth/email-confirmation/confirm", null, {
//       headers: { Authorization: `Bearer ${token}` },
//     })
//     .then((response) => response.data);
// };

// // ## Kingdoms
// export const createKingdom = async (params: {
//   token: string;
//   createKingdomDto: CreateKingdomDto;
// }): Promise<Kingdom> => {
//   const { token, createKingdomDto } = params;
//   return axiosClient
//     .post("kingdom", createKingdomDto, {
//       headers: { Authorization: `Bearer ${token}` },
//     })
//     .then((response) => response.data);
// };

// export const updateKingdom = async (params: {
//   token: string;
//   updateKingdomDto: UpdateKingdomDto;
// }): Promise<Kingdom> => {
//   const { token, updateKingdomDto } = params;
//   return axiosClient
//     .patch("kingdom", updateKingdomDto, {
//       headers: { Authorization: `Bearer ${token}` },
//     })
//     .then((response) => response.data);
// };

// export const deleteKingdom = async (params: {
//   token: string;
//   id: number;
// }): Promise<void> => {
//   const { token, id } = params;
//   return axiosClient
//     .delete(`kingdom/${id}`, {
//       headers: { Authorization: `Bearer ${token}` },
//     })
//     .then((response) => response.data);
// };

// // ## Phylums
// export const createPhylum = async (params: {
//   token: string;
//   createPhylumDto: CreatePhylumDto;
// }): Promise<Phylum> => {
//   const { token, createPhylumDto } = params;
//   return axiosClient
//     .post("phylum", createPhylumDto, {
//       headers: { Authorization: `Bearer ${token}` },
//     })
//     .then((response) => response.data);
// };

// export const updatePhylum = async (params: {
//   token: string;
//   updatePhylumDto: UpdatePhylumDto;
// }): Promise<Phylum> => {
//   const { token, updatePhylumDto } = params;
//   return axiosClient
//     .patch("phylum", updatePhylumDto, {
//       headers: { Authorization: `Bearer ${token}` },
//     })
//     .then((response) => response.data);
// };

// export const deletePhylum = async (params: {
//   token: string;
//   id: number;
// }): Promise<void> => {
//   const { token, id } = params;
//   return axiosClient
//     .delete(`phylum/${id}`, {
//       headers: { Authorization: `Bearer ${token}` },
//     })
//     .then((response) => response.data);
// };

// // ## ClassesTax
// export const createClassTax = async (params: {
//   token: string;
//   createClassTaxDto: CreateClassTaxDto;
// }): Promise<ClassTax> => {
//   const { token, createClassTaxDto } = params;
//   return axiosClient
//     .post("class-tax", createClassTaxDto, {
//       headers: { Authorization: `Bearer ${token}` },
//     })
//     .then((response) => response.data);
// };

// export const updateClassTax = async (params: {
//   token: string;
//   updateClassTaxDto: UpdateClassTaxDto;
// }): Promise<ClassTax> => {
//   const { token, updateClassTaxDto } = params;
//   return axiosClient
//     .patch("class-tax", updateClassTaxDto, {
//       headers: { Authorization: `Bearer ${token}` },
//     })
//     .then((response) => response.data);
// };

// export const deleteClassTax = async (params: {
//   token: string;
//   id: number;
// }): Promise<void> => {
//   const { token, id } = params;
//   return axiosClient
//     .delete(`class-tax/${id}`, {
//       headers: { Authorization: `Bearer ${token}` },
//     })
//     .then((response) => response.data);
// };

// // ## OrdersTax
// export const createOrderTax = async (params: {
//   token: string;
//   createOrderTaxDto: CreateOrderTaxDto;
// }): Promise<OrderTax> => {
//   const { token, createOrderTaxDto } = params;
//   return axiosClient
//     .post("order-tax", createOrderTaxDto, {
//       headers: { Authorization: `Bearer ${token}` },
//     })
//     .then((response) => response.data);
// };

// export const updateOrderTax = async (params: {
//   token: string;
//   updateOrderTaxDto: UpdateOrderTaxDto;
// }): Promise<OrderTax> => {
//   const { token, updateOrderTaxDto } = params;
//   return axiosClient
//     .patch("order-tax", updateOrderTaxDto, {
//       headers: { Authorization: `Bearer ${token}` },
//     })
//     .then((response) => response.data);
// };

// export const deleteOrderTax = async (params: {
//   token: string;
//   id: number;
// }): Promise<void> => {
//   const { token, id } = params;
//   return axiosClient
//     .delete(`order-tax/${id}`, {
//       headers: { Authorization: `Bearer ${token}` },
//     })
//     .then((response) => response.data);
// };

// // ## Families
// export const createFamily = async (params: {
//   token: string;
//   createFamilyDto: CreateFamilyDto;
// }): Promise<Family> => {
//   const { token, createFamilyDto } = params;
//   return axiosClient
//     .post("family", createFamilyDto, {
//       headers: { Authorization: `Bearer ${token}` },
//     })
//     .then((response) => response.data);
// };

// export const updateFamily = async (params: {
//   token: string;
//   updateFamilyDto: UpdateFamilyDto;
// }): Promise<Family> => {
//   const { token, updateFamilyDto } = params;
//   return axiosClient
//     .patch("family", updateFamilyDto, {
//       headers: { Authorization: `Bearer ${token}` },
//     })
//     .then((response) => response.data);
// };

// export const deleteFamily = async (params: {
//   token: string;
//   id: number;
// }): Promise<void> => {
//   const { token, id } = params;
//   return axiosClient
//     .delete(`family/${id}`, {
//       headers: { Authorization: `Bearer ${token}` },
//     })
//     .then((response) => response.data);
// };

// // ## Genera
// export const createGenus = async (params: {
//   token: string;
//   createGenusDto: CreateGenusDto;
// }): Promise<Genus> => {
//   const { token, createGenusDto } = params;
//   return axiosClient
//     .post("genus", createGenusDto, {
//       headers: { Authorization: `Bearer ${token}` },
//     })
//     .then((response) => response.data);
// };

// export const updateGenus = async (params: {
//   token: string;
//   updateGenusDto: UpdateGenusDto;
// }): Promise<Genus> => {
//   const { token, updateGenusDto } = params;
//   return axiosClient
//     .patch("genus", updateGenusDto, {
//       headers: { Authorization: `Bearer ${token}` },
//     })
//     .then((response) => response.data);
// };

// export const deleteGenus = async (params: {
//   token: string;
//   id: number;
// }): Promise<void> => {
//   const { token, id } = params;
//   return axiosClient
//     .delete(`genus/${id}`, {
//       headers: { Authorization: `Bearer ${token}` },
//     })
//     .then((response) => response.data);
// };

// // ## Species
// export const createSpecies = async (params: {
//   token: string;
//   createSpeciesDto: CreateSpeciesDto;
// }): Promise<Species> => {
//   const { token, createSpeciesDto } = params;
//   return axiosClient
//     .post("species", createSpeciesDto, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "multipart/form-data",
//       },
//     })
//     .then((response) => response.data);
// };

// export const updateSpecies = async (params: {
//   token: string;
//   updateSpeciesDto: UpdateSpeciesDto;
// }): Promise<Species> => {
//   const { token, updateSpeciesDto } = params;

//   return axiosClient
//     .patch("species", updateSpeciesDto, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "multipart/form-data",
//       },
//     })
//     .then((response) => response.data);
// };

// export const deleteSpecies = async (params: {
//   token: string;
//   id: number;
// }): Promise<void> => {
//   const { token, id } = params;
//   return axiosClient
//     .delete(`species/${id}`, {
//       headers: { Authorization: `Bearer ${token}` },
//     })
//     .then((response) => response.data);
// };

// // ## Specimens
// export const createSpecimen = async (params: {
//   token: string;
//   createSpecimenDto: CreateSpecimenDto;
// }): Promise<Specimen> => {
//   const { token, createSpecimenDto } = params;
//   return axiosClient
//     .post("specimen", createSpecimenDto, {
//       headers: { Authorization: `Bearer ${token}` },
//     })
//     .then((response) => response.data);
// };

// export const updateSpecimen = async (params: {
//   token: string;
//   updateSpecimenDto: UpdateSpecimenDto;
// }): Promise<Specimen> => {
//   const { token, updateSpecimenDto } = params;
//   return axiosClient
//     .patch("specimen", updateSpecimenDto, {
//       headers: { Authorization: `Bearer ${token}` },
//     })
//     .then((response) => response.data);
// };

// export const deleteSpecimen = async (params: {
//   token: string;
//   id: number;
// }): Promise<void> => {
//   const { token, id } = params;
//   return axiosClient
//     .delete(`specimen/${id}`, {
//       headers: { Authorization: `Bearer ${token}` },
//     })
//     .then((response) => response.data);
// };

// # Queries ------------------------------------------------------------------

// ## Users
export const getAuthUser = async (): Promise<User> => {
  const token = Cookies.get("accessToken");
  return axiosClient
    .get("auth/me", { headers: { Authorization: `Bearer ${token}` } })
    .then((response) => response.data);
};

// ## Kingdoms
export const getKingdoms = async (params: {
  pagination?: Pagination;
}): Promise<PaginatedList<Kingdom>> => {
  const { pagination } = params;
  return axiosClient
    .get(`kingdom`, {
      params: pagination,
    })
    .then((response) => response.data);
};

// export const getKingdom = async (params: { id: number }): Promise<Kingdom> => {
//   const { id } = params;
//   return axiosClient.get(`kingdom/${id}`).then((response) => response.data);
// };

// // ## Phylums
// export const getPhylums = async (params: {
//   pagination?: Pagination;
// }): Promise<PaginatedList<Phylum>> => {
//   const { pagination } = params;
//   return axiosClient
//     .get(`phylum`, {
//       params: pagination,
//     })
//     .then((response) => response.data);
// };

// export const getPhylum = async (params: { id: number }): Promise<Phylum> => {
//   const { id } = params;
//   return axiosClient.get(`phylum/${id}`).then((response) => response.data);
// };

// // ## ClassesTax
// export const getClassesTax = async (params: {
//   pagination?: Pagination;
// }): Promise<PaginatedList<ClassTax>> => {
//   const { pagination } = params;
//   return axiosClient
//     .get(`class-tax`, {
//       params: pagination,
//     })
//     .then((response) => response.data);
// };

// export const getClassTax = async (params: {
//   id: number;
// }): Promise<ClassTax> => {
//   const { id } = params;
//   return axiosClient.get(`class-tax/${id}`).then((response) => response.data);
// };

// // ## OrdersTax
// export const getOrdersTax = async (params: {
//   pagination?: Pagination;
// }): Promise<PaginatedList<OrderTax>> => {
//   const { pagination } = params;
//   return axiosClient
//     .get(`order-tax`, {
//       params: pagination,
//     })
//     .then((response) => response.data);
// };

// export const getOrderTax = async (params: {
//   id: number;
// }): Promise<OrderTax> => {
//   const { id } = params;
//   return axiosClient.get(`order-tax/${id}`).then((response) => response.data);
// };

// // ## Families
// export const getFamilies = async (params: {
//   pagination?: Pagination;
// }): Promise<PaginatedList<Family>> => {
//   const { pagination } = params;
//   return axiosClient
//     .get(`family`, {
//       params: pagination,
//     })
//     .then((response) => response.data);
// };

// export const getFamily = async (params: { id: number }): Promise<Family> => {
//   const { id } = params;
//   return axiosClient.get(`family/${id}`).then((response) => response.data);
// };

// // ## Genera
// export const getGenera = async (params: {
//   pagination?: Pagination;
// }): Promise<PaginatedList<Genus>> => {
//   const { pagination } = params;
//   return axiosClient
//     .get(`genus`, {
//       params: pagination,
//     })
//     .then((response) => response.data);
// };

// export const getGenus = async (params: { id: number }): Promise<Genus> => {
//   const { id } = params;
//   return axiosClient.get(`genus/${id}`).then((response) => response.data);
// };

// // ## Species
// export const getSpecies = async (params: {
//   pagination?: Pagination;
// }): Promise<PaginatedList<Species>> => {
//   const { pagination } = params;
//   return axiosClient
//     .get(`species`, {
//       params: pagination,
//     })
//     .then((response) => response.data);
// };

// export const getOneSpecies = async (params: {
//   id: number;
// }): Promise<Species> => {
//   const { id } = params;
//   return axiosClient.get(`species/${id}`).then((response) => response.data);
// };

// // ## Specimens
// export const getSpecimens = async (params: {
//   pagination?: Pagination;
// }): Promise<PaginatedList<Specimen>> => {
//   const { pagination } = params;
//   return axiosClient
//     .get(`specimen`, {
//       params: pagination,
//     })
//     .then((response) => response.data);
// };

// export const getSpecimen = async (params: {
//   id: number;
// }): Promise<Specimen> => {
//   const { id } = params;
//   return axiosClient.get(`specimen/${id}`).then((response) => response.data);
// };

// // ## Administration
// export const getGlobalSearch = async (params: {
//   value: string;
// }): Promise<any> => {
//   const { value } = params;
//   return axiosClient
//     .get(`administration/global-search`, { params: { value: value } })
//     .then((response) => response.data);
// };
