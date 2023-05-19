import { ApiProperty } from '@nestjs/swagger';
import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
	ManyToOne,
	JoinColumn,
} from 'typeorm';
import { User } from '../user/user.entity';

@Entity('notes')
export class Note extends BaseEntity {
	@ApiProperty()
	@PrimaryGeneratedColumn('increment')
	id: number;

	@ApiProperty()
	@Column({ 
		name: 'title', 
		type: 'varchar', 
		nullable: false, 
		unique: true 
	})
	title: string;

	@ApiProperty()
	@Column({ 
		name: 'content', 
		type: 'text', 
		nullable: false, 
		unique: false 
	})
	content: string;

	// Relation
	@ApiProperty({
		type: () => User
	})
	@ManyToOne(() => User, user => user.notes)
	@JoinColumn({ 
		name: 'user_id' 
	})
	user: User;

	@ApiProperty()
	@CreateDateColumn({ name: 'created_at' })
	createdAt: Date;

	@ApiProperty()
	@UpdateDateColumn({ name: 'updated_at' })
	updatedAt: Date;

	@ApiProperty()
	@Column({ name: 'deleted', type: 'boolean', default: false })
	deleted: boolean;
}
