import { Picture } from "./picture.interface";

export enum Role {
  USER = "USER",
  EDITOR = "EDITOR",
  ADMIN = "ADMIN",
}

export enum Status {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

export interface User {
  id: number;
  email: string;
  isEmailConfirmed: boolean;
  firstname: string;
  lastname: string;
  profilePicture?: Picture;
  status: Status;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
  deleted: boolean;
}

export interface CreateUserDto {
  email: string;
  firstname: string;
  lastname: string;
  password: string;
}

export interface UpdateUserDto {
  id: number;
  email?: string;
  isEmailConfirmed?: boolean;
  firstname?: string;
  lastname?: string;
  profilePicture?: Picture | null;
  status?: Status;
  role?: Role;
}

export const userToString = (user: User) => {
  return `${user.firstname} ${user.lastname}`;
};
