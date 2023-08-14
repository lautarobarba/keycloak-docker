import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Exclude } from "class-transformer";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Role } from "../auth/role.enum";

export enum Status {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

@Entity("users")
export class User extends BaseEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn("increment")
  id: number;

  @ApiProperty()
  @Column({
    name: "email",
    type: "varchar",
    nullable: false,
    unique: true,
    length: 255,
  })
  email: string;

  @ApiProperty()
  @Column({
    name: "is_email_confirmed",
    type: "boolean",
    default: false,
  })
  isEmailConfirmed: boolean;

  @ApiProperty()
  @Column({
    name: "firstname",
    type: "varchar",
    nullable: false,
    unique: false,
    length: 255,
  })
  firstname: string;

  @ApiProperty()
  @Column({
    name: "lastname",
    type: "varchar",
    nullable: false,
    unique: false,
    length: 255,
  })
  lastname: string;

  @Exclude()
  @Column({
    name: "password",
    type: "varchar",
    nullable: false,
    unique: false,
    length: 255,
  })
  password: string;

  // TODO: Eliminar refreshToken. No lo voy a usar con esta aplicación
  @Exclude()
  @Column({
    name: "refresh_token",
    type: "varchar",
    nullable: true,
    unique: false,
    length: 255,
  })
  refreshToken: string;

  @ApiProperty()
  @Column({
    name: "status",
    type: "enum",
    enum: Status,
    default: Status.ACTIVE,
    nullable: false,
  })
  status: Status;

  @ApiProperty()
  @Column({
    name: "role",
    type: "enum",
    enum: Role,
    default: Role.USER,
    nullable: false,
  })
  role: Role;

  @ApiProperty()
  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @ApiProperty()
  @Column({
    name: "deleted",
    type: "boolean",
    default: false,
  })
  deleted: boolean;
}
