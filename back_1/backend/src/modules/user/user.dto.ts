import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Role } from '../auth/role.enum';
import { Express } from 'express';

export class CreateUserDto {
	@ApiProperty()
	email: string;

	@ApiProperty()
	firstname: string;

	@ApiProperty()
	lastname: string;

	@ApiPropertyOptional({
		type: 'string',
		format: 'binary'
	})
	profilePicture?: Express.Multer.File;

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
	status?: string;

	@ApiPropertyOptional()
	role?: Role;
}
