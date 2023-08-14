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
import { Family } from "../family/family.entity";
import { User } from "../user/user.entity";
import { Species } from "../species/species.entity";

@Entity("genera")
export class Genus extends BaseEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn("increment")
  id: number;

  @ApiProperty()
  @Column({
    name: "name",
    type: "varchar",
    nullable: false,
    unique: false,
    length: 255,
  })
  name: string;

  @ApiProperty()
  @Column({
    name: "description",
    type: "text",
    nullable: true,
    unique: false,
  })
  description: string;

  // Relation
  @ApiProperty({
    type: () => Family,
  })
  @ManyToOne(() => Family, (family) => family.genera, {
    nullable: false,
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
    eager: true,
  })
  @JoinColumn({
    name: "family_id",
  })
  family: Family;

  @ApiProperty()
  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @ApiProperty()
  @Column({ name: "deleted", type: "boolean", default: false })
  deleted: boolean;

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

  // Relation
  @ApiProperty({
    type: () => Species,
    isArray: true,
  })
  @OneToMany(() => Species, (species) => species.genus, {
    eager: false,
  })
  species: Species[];
}
