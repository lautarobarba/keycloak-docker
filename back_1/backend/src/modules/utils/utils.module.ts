import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Picture } from './picture.entity';
import { UtilsService } from './utils.service';

@Module({
	imports: [
		TypeOrmModule.forFeature([Picture]),
	],
	providers: [UtilsService],
	exports: [UtilsService],
})
export class UtilsModule { }
