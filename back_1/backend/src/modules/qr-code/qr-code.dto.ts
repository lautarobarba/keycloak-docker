import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateQRCodeDto {
	@ApiProperty()
	title: string;

	@ApiPropertyOptional()
	specimenId?: number;
}

export class UpdateQRCodeDto {
	@ApiProperty()
	id: number;

	@ApiPropertyOptional()
	title?: string;

	@ApiPropertyOptional()
	specimenId?: number;
}
