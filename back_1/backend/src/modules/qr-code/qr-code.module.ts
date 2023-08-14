import { Module } from '@nestjs/common';
import { QRCodeService } from './qr-code.service';
import { QRCodeController } from './qr-code.controller';
import { QRCode } from './qr-code.entity';
import { UserModule } from '../user/user.module';
import { SpecimenModule } from '../specimen/specimen.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([QRCode]),
    UserModule,
    SpecimenModule
  ],
  controllers: [QRCodeController],
  providers: [QRCodeService]
})
export class QRCodeModule { }
