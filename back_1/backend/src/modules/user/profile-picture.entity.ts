import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	OneToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from './user.entity';


@Entity('profile_pictures')
export class ProfilePicture extends BaseEntity {
	@ApiProperty()
	@PrimaryGeneratedColumn('increment')
	id: number;

	@ApiProperty()
	@Column({
		name: 'file_name',
		type: 'varchar',
		nullable: false,
		unique: true,
	})
	fileName: string;

	@ApiProperty()
	@Column({
		name: 'path',
		type: 'varchar',
		nullable: false,
		unique: false,
		length: 255,
	})
	path: string;

	@ApiProperty()
	@Column({
		name: 'mimetype',
		type: 'varchar',
		nullable: true,
		unique: false,
	})
	mimetype: string;

	@ApiProperty()
	@Column({
		name: 'original_name',
		type: 'varchar',
		nullable: true,
		unique: false,
	})
	originalName: string;

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

	@ApiProperty()
	@Column({ 
		name: 'file_deleted', 
		type: 'boolean', 
		default: false 
	})
	fileDeleted: boolean;

	// Relation
	@OneToOne(() => User, user => user.profilePicture)
	user: User;
}
