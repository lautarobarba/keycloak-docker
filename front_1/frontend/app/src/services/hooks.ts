import useSWR from "swr";
import {
  registerUser,
  // login,
  // logout,
  // getAuthUser,
  // getFamilies,
  // sendEmailConfirmationEmail,
  // confirmEmail,
  // createFamily,
  // getGenera,
  // createGenus,
  // getSpecies,
  // createSpecies,
  // getSpecimens,
  // createSpecimen,
  // updateUser,
  // getFamily,
  // updateFamily,
  // deleteFamily,
  // getGenus,
  // getOneSpecies,
  // getSpecimen,
  // updateGenus,
  // deleteGenus,
  // updateSpecies,
  // deleteSpecies,
  // updateSpecimen,
  // deleteSpecimen,
  // createKingdom,
  getKingdoms,
  // updateKingdom,
  // getKingdom,
  // deleteKingdom,
  // getGlobalSearch,
  // createPhylum,
  // updatePhylum,
  // deletePhylum,
  // getPhylums,
  // getPhylum,
  // createClassTax,
  // updateClassTax,
  // deleteClassTax,
  // getClassesTax,
  // getClassTax,
  // createOrderTax,
  // updateOrderTax,
  // deleteOrderTax,
  // getOrdersTax,
  // getOrderTax,
} from "./fetchers";
import { Pagination } from "../interfaces/pagination.interface";

// Mutations hooks ------------------------------------------------------------
// ## Users
// export const useRegister = () => {
//   return useMutation(registerUser);
// };

// export const useLogin = () => {
//   return useSWR("user", login);
// };

// export const useUpdateUser = () => {
//   return useMutation(updateUser);
// };

// export const useLogout = () => {
//   return useMutation(logout);
// };

// export const useSendEmailConfirmationEmail = () => {
//   return useMutation(sendEmailConfirmationEmail);
// };

// export const useConfirmEmail = () => {
//   return useMutation(confirmEmail);
// };

// // ## Kingdoms
// export const useCreateKingdom = () => {
//   return useMutation(createKingdom);
// };

// export const useUpdateKingdom = () => {
//   return useMutation(updateKingdom);
// };

// export const useDeleteKingdom = () => {
//   return useMutation(deleteKingdom);
// };

// // ## Phylums
// export const useCreatePhylum = () => {
//   return useMutation(createPhylum);
// };

// export const useUpdatePhylum = () => {
//   return useMutation(updatePhylum);
// };

// export const useDeletePhylum = () => {
//   return useMutation(deletePhylum);
// };

// // ## ClassesTax
// export const useCreateClassTax = () => {
//   return useMutation(createClassTax);
// };

// export const useUpdateClassTax = () => {
//   return useMutation(updateClassTax);
// };

// export const useDeleteClassTax = () => {
//   return useMutation(deleteClassTax);
// };

// // ## OrdersTax
// export const useCreateOrderTax = () => {
//   return useMutation(createOrderTax);
// };

// export const useUpdateOrderTax = () => {
//   return useMutation(updateOrderTax);
// };

// export const useDeleteOrderTax = () => {
//   return useMutation(deleteOrderTax);
// };

// // ## Families
// export const useCreateFamily = () => {
//   return useMutation(createFamily);
// };

// export const useUpdateFamily = () => {
//   return useMutation(updateFamily);
// };

// export const useDeleteFamily = () => {
//   return useMutation(deleteFamily);
// };

// // ## Genera
// export const useCreateGenus = () => {
//   return useMutation(createGenus);
// };

// export const useUpdateGenus = () => {
//   return useMutation(updateGenus);
// };

// export const useDeleteGenus = () => {
//   return useMutation(deleteGenus);
// };

// // ## Species
// export const useCreateSpecies = () => {
//   return useMutation(createSpecies);
// };

// export const useUpdateSpecies = () => {
//   return useMutation(updateSpecies);
// };

// export const useDeleteSpecies = () => {
//   return useMutation(deleteSpecies);
// };

// // ## Species
// export const useCreateSpecimen = () => {
//   return useMutation(createSpecimen);
// };

// export const useUpdateSpecimen = () => {
//   return useMutation(updateSpecimen);
// };

// export const useDeleteSpecimen = () => {
//   return useMutation(deleteSpecimen);
// };

// // Queries hooks --------------------------------------------------------------
// // ## Users
// export const useGetAuthUser = (
//   token: string,
//   config?: Omit<
//     UseQueryOptions<any, unknown, any, string[]>,
//     "queryKey" | "queryFn"
//   >
// ) => {
//   return useQuery(["auth-user"], () => getAuthUser(token), config);
// };

// ## Kingdoms
export const useGetKingdoms = (params: { pagination?: Pagination }) => {
  return useSWR("kingdoms", () => getKingdoms(params));
};

// export const useGetKingdom = (params: { id: number }, config?: any) => {
//   return useQuery([`kingdom-${params.id}`], () => getKingdom(params), config);
// };

// // ## Phylums
// export const useGetPhylums = (
//   params: {
//     pagination?: Pagination;
//   },
//   config?: any
// ) => {
//   const { pagination } = params;
//   return useQuery(["phylums", pagination], () => getPhylums(params), config);
// };

// export const useGetPhylum = (params: { id: number }, config?: any) => {
//   return useQuery([`phylum-${params.id}`], () => getPhylum(params), config);
// };

// // ## ClassesTax
// export const useGetClassesTax = (
//   params: {
//     pagination?: Pagination;
//   },
//   config?: any
// ) => {
//   const { pagination } = params;
//   return useQuery(
//     ["class-tax", pagination],
//     () => getClassesTax(params),
//     config
//   );
// };

// export const useGetClassTax = (params: { id: number }, config?: any) => {
//   return useQuery(
//     [`class-tax-${params.id}`],
//     () => getClassTax(params),
//     config
//   );
// };

// // ## OrdersTax
// export const useGetOrdersTax = (
//   params: {
//     pagination?: Pagination;
//   },
//   config?: any
// ) => {
//   const { pagination } = params;
//   return useQuery(
//     ["orders-tax", pagination],
//     () => getOrdersTax(params),
//     config
//   );
// };

// export const useGetOrderTax = (params: { id: number }, config?: any) => {
//   return useQuery(
//     [`order-tax-${params.id}`],
//     () => getOrderTax(params),
//     config
//   );
// };

// // ## Families
// export const useGetFamilies = (
//   params: {
//     pagination?: Pagination;
//   },
//   config?: any
// ) => {
//   const { pagination } = params;
//   return useQuery(["families", pagination], () => getFamilies(params), config);
// };

// export const useGetFamily = (params: { id: number }, config?: any) => {
//   return useQuery([`family-${params.id}`], () => getFamily(params), config);
// };

// // ## Genera
// export const useGetGenera = (
//   params: {
//     pagination?: Pagination;
//   },
//   config?: any
// ) => {
//   const { pagination } = params;
//   return useQuery(["genera", pagination], () => getGenera(params), config);
// };

// export const useGetGenus = (params: { id: number }, config?: any) => {
//   return useQuery([`genus-${params.id}`], () => getGenus(params), config);
// };

// // ## Species
// export const useGetSpecies = (
//   params: {
//     pagination?: Pagination;
//   },
//   config?: any
// ) => {
//   const { pagination } = params;
//   return useQuery(["species", pagination], () => getSpecies(params), config);
// };

// export const useGetOneSpecies = (params: { id: number }, config?: any) => {
//   return useQuery(
//     [`species-${params.id}`],
//     () => getOneSpecies(params),
//     config
//   );
// };

// // ## Specimens
// export const useGetSpecimens = (
//   params: {
//     pagination?: Pagination;
//   },
//   config?: any
// ) => {
//   const { pagination } = params;
//   return useQuery(
//     ["specimens", pagination],
//     () => getSpecimens(params),
//     config
//   );
// };

// export const useGetSpecimen = (params: { id: number }, config?: any) => {
//   return useQuery([`specimen-${params.id}`], () => getSpecimen(params), config);
// };

// // ## Administration
// export const useGetGlobalSearch = (params: { value: string }, config?: any) => {
//   return useQuery(
//     ["global-search", params],
//     () => getGlobalSearch(params),
//     config
//   );
// };
