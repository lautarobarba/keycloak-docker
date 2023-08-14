import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { UtilsModule } from 'modules/utils/utils.module';

@Module({
	imports: [
		TypeOrmModule.forFeature([User]),
		UtilsModule,
	],
	providers: [UserService],
	controllers: [UserController],
	exports: [UserService],
})
export class UserModule { }
