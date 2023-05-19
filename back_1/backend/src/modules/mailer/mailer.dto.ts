import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class EmailTestDto {
	@ApiProperty()
	userEmail: string;

	@ApiPropertyOptional()
	overwriteEmail?: string;
}