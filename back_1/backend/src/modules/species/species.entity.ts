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
import { Genus } from "../genus/genus.entity";
import { User } from "../user/user.entity";
import { Specimen } from "../specimen/specimen.entity";

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

@Entity("species")
export class Species extends BaseEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn("increment")
  id: number;

  @ApiProperty()
  @Column({
    name: "scientific_name",
    type: "varchar",
    nullable: true,
    unique: false,
    length: 255,
  })
  scientificName: string;

  @ApiProperty()
  @Column({
    name: "common_name",
    type: "varchar",
    nullable: true,
    unique: false,
    length: 255,
  })
  commonName: string;

  @ApiProperty()
  @Column({
    name: "english_name",
    type: "varchar",
    nullable: true,
    unique: false,
    length: 255,
  })
  englishName: string;

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
    type: () => Genus,
  })
  @ManyToOne(() => Genus, (genus) => genus.species, {
    nullable: false,
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
    eager: true,
  })
  @JoinColumn({
    name: "genus_id",
  })
  genus: Genus;

  @ApiProperty()
  @Column({
    name: "organism_type",
    type: "enum",
    enum: OrganismType,
    default: OrganismType.TREE,
    nullable: true,
  })
  organismType: OrganismType;

  @ApiProperty()
  @Column({
    name: "status",
    type: "enum",
    enum: Status,
    default: Status.NATIVE,
    nullable: true,
  })
  status: Status;

  @ApiProperty()
  @Column({
    name: "foliage_type",
    type: "enum",
    enum: FoliageType,
    default: FoliageType.DECIDUOUS,
    nullable: true,
  })
  foliageType: FoliageType;

  @ApiProperty()
  @Column({
    name: "presence",
    type: "enum",
    enum: Presence,
    default: Presence.PRESENT,
    nullable: true,
  })
  presence: Presence;

  // // Relation
  // @ApiProperty({
  //   type: () => Picture,
  // })
  // @OneToOne(() => Picture, (picture) => picture.speciesExample, {
  //   cascade: true,
  //   onDelete: "RESTRICT",
  //   eager: true,
  // })
  // @JoinColumn({
  //   name: "example_img",
  // })
  // exampleImg: Picture;

  // // Relation
  // @ApiProperty({
  //   type: () => Picture,
  // })
  // @OneToOne(() => Picture, (picture) => picture.speciesFoliage, {
  //   cascade: true,
  //   onDelete: "RESTRICT",
  //   eager: true,
  // })
  // @JoinColumn({
  //   name: "foliage_img",
  // })
  // foliageImg: Picture;

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
    type: () => Specimen,
    isArray: true,
  })
  @OneToMany(() => Specimen, (specimen) => specimen.species, {
    eager: false,
  })
  specimens: Specimen[];
}
