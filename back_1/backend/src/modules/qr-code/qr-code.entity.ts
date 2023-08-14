import { ApiProperty } from "@nestjs/swagger";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Species } from "../species/species.entity";
import { Family } from "../family/family.entity";
import { Specimen } from "../specimen/specimen.entity";

@Entity("qr_codes")
export class QRCode extends BaseEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn("increment")
  id: number;

  @ApiProperty()
  @Column({
    name: "title",
    type: "varchar",
    nullable: false,
    unique: true,
    length: 255,
  })
  title: string;

  @ApiProperty()
  @Column({
    name: "model_class",
    type: "varchar",
    nullable: true,
    unique: false,
    length: 255,
  })
  modelClass: string;

  @ApiProperty()
  @Column({
    name: "model_id",
    type: "int",
    nullable: true,
    unique: false,
  })
  modelId: number;

  @ApiProperty()
  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @ApiProperty()
  @Column({ name: "deleted", type: "boolean", default: false })
  deleted: boolean;
}
