import { Controller, Get, Post, Body, Req, Patch, Param, Delete, UseInterceptors, ClassSerializerInterceptor, HttpStatus, Logger } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { EmailTestDto } from './mailer.dto';
import { MailerService } from './mailer.service';

@ApiTags('Emails')
@Controller('mailer')
export class MailerController {
  constructor(private readonly _mailerService: MailerService) {}
  private readonly _logger = new Logger(MailerController.name);

  @Post('test-email')
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({ 
		status: HttpStatus.OK, 
	  description: 'Email sent',
	})
  async sendTestEmail(
    @Req() request: Request,
    @Body() emailTestDto: EmailTestDto
  ) {
    this._logger.debug('POST: /api/mailer/test-email');
    const ulrToImportCssInEmail: string = `${request.protocol}://host.docker.internal:${process.env.BACK_PORT}`;
    const ulrToImportImagesInEmail: string = `${request.protocol}://${request.get('Host')}`;
    // console.log(ulrToImportCssInEmail);
    // console.log(ulrToImportImagesInEmail);
    return this._mailerService.sendTestEmail(
      ulrToImportCssInEmail, 
      ulrToImportImagesInEmail,
      emailTestDto.userEmail,
      emailTestDto.overwriteEmail
    );
  }

  @Post('test-register-email')
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({ 
		status: HttpStatus.OK, 
	  description: 'Email sent',
	})
  @ApiResponse({
		status: HttpStatus.NOT_FOUND,
		description: 'Error: Not Found',
	})
  async sendRegistrationEmail(
    @Req() request: Request,
    @Body() emailTestDto: EmailTestDto
  ) {
    this._logger.debug('POST: /api/mailer/test-register-email');
    const ulrToImportCssInEmail: string = `${request.protocol}://host.docker.internal:${process.env.BACK_PORT}`;
    const ulrToImportImagesInEmail: string = `${request.protocol}://${request.get('Host')}`;
    return this._mailerService.sendRegistrationEmail(
      ulrToImportCssInEmail, 
      ulrToImportImagesInEmail, 
      emailTestDto.userEmail,
      emailTestDto.overwriteEmail
    );
  }

  @Post('test-email-confirmation-email')
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({ 
		status: HttpStatus.OK, 
	  description: 'Email sent',
	})
  @ApiResponse({
		status: HttpStatus.NOT_FOUND,
		description: 'Error: Not Found',
	})
  async sendEmailConfirmationEmail(
    @Req() request: Request,
    @Body() emailTestDto: EmailTestDto
  ) {
    this._logger.debug('POST: /api/mailer/test-email-confirmation-email');
    const ulrToImportCssInEmail: string = `${request.protocol}://host.docker.internal:${process.env.BACK_PORT}`;
    const ulrToImportImagesInEmail: string = `${request.protocol}://${request.get('Host')}`;
    return this._mailerService.sendEmailConfirmationEmail(
      ulrToImportCssInEmail, 
      ulrToImportImagesInEmail, 
      emailTestDto.userEmail,
      'Fake-Access-Token',
      emailTestDto.overwriteEmail
    );
  }

  @Post('test-email-confirmed-email')
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({ 
		status: HttpStatus.OK, 
	  description: 'Email sent',
	})
  @ApiResponse({
		status: HttpStatus.NOT_FOUND,
		description: 'Error: Not Found',
	})
  async sendEmailConfirmedEmail(
    @Req() request: Request,
    @Body() emailTestDto: EmailTestDto
  ) {
    this._logger.debug('POST: /api/mailer/test-email-confirmed-email');
    const ulrToImportCssInEmail: string = `${request.protocol}://host.docker.internal:${process.env.BACK_PORT}`;
    const ulrToImportImagesInEmail: string = `${request.protocol}://${request.get('Host')}`;
    return this._mailerService.sendEmailConfirmedEmail(
      ulrToImportCssInEmail, 
      ulrToImportImagesInEmail, 
      emailTestDto.userEmail,
      emailTestDto.overwriteEmail
    );
  }
}
