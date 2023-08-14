import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Role } from '../auth/role.enum';
import { Express } from 'express';
import { Status } from './user.entity';

export class CreateUserDto {
	@ApiProperty()
	email: string;

	@ApiProperty()
	firstname: string;

	@ApiProperty()
	lastname: string;

	@ApiProperty()
	password: string;
}

export class UpdateUserDto {
	@ApiProperty()
	id: number;

	@ApiPropertyOptional()
	email?: string;

	@ApiPropertyOptional()
	isEmailConfirmed?: boolean;

	@ApiPropertyOptional()
	firstname: string;

	@ApiPropertyOptional()
	lastname: string;

	@ApiPropertyOptional({
		type: 'string',
		format: 'binary'
	})
	profilePicture?: Express.Multer.File;

	@ApiPropertyOptional()
	status?: Status;

	@ApiPropertyOptional()
	role?: Role;
}
