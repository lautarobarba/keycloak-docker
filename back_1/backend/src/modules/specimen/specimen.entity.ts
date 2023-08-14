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
import { User } from "../user/user.entity";

@Entity("specimens")
export class Specimen extends BaseEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn("increment")
  id: number;

  @ApiProperty()
  @Column({
    name: "name",
    type: "varchar",
    nullable: false,
    unique: true,
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
    type: () => Species,
    isArray: false,
  })
  @ManyToOne(() => Species, (species) => species.specimens, {
    nullable: false,
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
    eager: true,
  })
  @JoinColumn({
    name: "species_id",
  })
  species: Species;

  @ApiProperty()
  @Column({
    name: "coord_lat",
    type: "varchar",
    nullable: true,
    unique: false,
  })
  coordLat: string;

  @ApiProperty()
  @Column({
    name: "coord_lon",
    type: "varchar",
    nullable: true,
    unique: false,
  })
  coordLon: string;

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
}
