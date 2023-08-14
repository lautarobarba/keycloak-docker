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
import { Phylum } from "../phylum/phylum.entity";
import { User } from "../user/user.entity";
import { OrderTax } from "../order-tax/order-tax.entity";

@Entity("classes_tax")
export class ClassTax extends BaseEntity {
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
    type: () => Phylum,
    isArray: false,
  })
  @ManyToOne(() => Phylum, (phylum) => phylum.classesTax, {
    nullable: false,
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
    eager: true,
  })
  @JoinColumn({
    name: "phylum_id",
  })
  phylum: Phylum;

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
    type: () => OrderTax,
    isArray: true,
  })
  @OneToMany(() => OrderTax, (orderTax) => orderTax.classTax, {
    eager: false,
  })
  ordersTax: OrderTax[];
}
