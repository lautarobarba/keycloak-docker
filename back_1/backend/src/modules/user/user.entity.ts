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
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Note } from '../note/note.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Role } from '../auth/role.enum';
import { ProfilePicture } from './profile-picture.entity';

export enum Status {
	ACTIVE = 'ACTIVE',
	INACTIVE = 'INACTIVE',
}

@Entity('users')
export class User extends BaseEntity {
	@ApiProperty()
	@PrimaryGeneratedColumn('increment')
	id: number;

	@ApiProperty()
	@Column({
		name: 'email',
		type: 'varchar',
		nullable: false,
		unique: true,
		length: 255,
	})
	email: string;

	@ApiProperty()
	@Column({ 
		name: 'is_email_confirmed', 
		type: 'boolean', 
		default: false 
	})
	isEmailConfirmed: boolean;

	@ApiProperty()
	@Column({
		name: 'firstname',
		type: 'varchar',
		nullable: false,
		unique: false,
		length: 255,
	})
	firstname: string;

	@ApiProperty()
	@Column({
		name: 'lastname',
		type: 'varchar',
		nullable: false,
		unique: false,
		length: 255,
	})
	lastname: string;

	// Relation
	@ApiProperty({
		type: () => ProfilePicture,
	})
	@OneToOne(() => ProfilePicture, profilePicture => profilePicture.user)
	@JoinColumn({
		name: 'profile_picture_id',
	})
	profilePicture: ProfilePicture;

	@Exclude()
	@Column({
		name: 'password',
		type: 'varchar',
		nullable: false,
		unique: false,
		length: 255,
	})
	password: string;

	@Exclude()
	@Column({
		name: 'refresh_token',
		type: 'varchar',
		nullable: true,
		unique: false,
		length: 255,
	})
	refreshToken: string;

	@ApiProperty()
	@Column({
		name: 'status',
		type: 'enum',
		enum: Status,
		default: Status.ACTIVE,
		nullable: false
	})
	status: string;

	@ApiProperty()
	@Column({
		name: 'role',
    type: 'enum',
    enum: Role,
    default: Role.USER,
		nullable: false
  })
  role: Role

	@ApiProperty()
	@CreateDateColumn({ name: 'created_at' })
	createdAt: Date;

	@ApiProperty()
	@UpdateDateColumn({ name: 'updated_at' })
	updatedAt: Date;

	@ApiProperty()
	@Column({ 
		name: 'deleted', 
		type: 'boolean', 
		default: false 
	})
	deleted: boolean;

	// Relation
	@OneToMany(() => Note, note => note.user)
	notes: Note[];
}
