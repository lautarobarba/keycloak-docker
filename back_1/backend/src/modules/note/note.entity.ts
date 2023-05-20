import { ApiProperty } from "@nestjs/swagger";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";

@Entity("notes")
export class Note extends BaseEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn("increment")
  id: number;

  @ApiProperty()
  @Column({
    name: "title",
    type: "varchar",
    nullable: false,
    unique: true,
  })
  title: string;

  @ApiProperty()
  @Column({
    name: "content",
    type: "text",
    nullable: false,
    unique: false,
  })
  content: string;

  @ApiProperty()
  @Column({
    name: "user_id",
    type: "varchar",
    nullable: true,
    unique: false,
  })
  userId: number;

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
