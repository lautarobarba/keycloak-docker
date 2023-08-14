import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { User } from "../user/user.entity";

@Entity("images")
export class Image extends BaseEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn("increment")
  id: number;

  @ApiProperty()
  @Column({
    name: "file_name",
    type: "varchar",
    nullable: false,
    unique: false,
  })
  fileName: string;

  @ApiProperty()
  @Column({
    name: "path",
    type: "varchar",
    nullable: false,
    unique: false,
  })
  path: string;

  @ApiProperty()
  @Column({
    name: "mimetype",
    type: "varchar",
    nullable: true,
    unique: false,
  })
  mimetype: string;

  @ApiProperty()
  @Column({
    name: "original_name",
    type: "varchar",
    nullable: true,
    unique: false,
  })
  originalName: string;

  @ApiProperty()
  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @ApiProperty()
  @Column({ name: "deleted", type: "boolean", default: false })
  deleted: boolean;

  @ApiProperty()
  @Column({
    name: "file_deleted",
    type: "boolean",
    default: false,
  })
  fileDeleted: boolean;

  // Relation
  @ApiProperty({
    type: () => User,
    isArray: false,
  })
  @ManyToOne(() => User, () => {}, {
    nullable: true,
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
    eager: false,
  })
  @JoinColumn({
    name: "user_mod_id",
  })
  userMod: User;
}
