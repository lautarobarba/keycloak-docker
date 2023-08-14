import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { Injectable, mixin, NestInterceptor, Type } from "@nestjs/common";
import {
  MulterField,
  MulterOptions,
} from "@nestjs/platform-express/multer/interfaces/multer-options.interface";
import { diskStorage } from "multer";

interface FileFieldsInterceptorOptions {
  files: MulterField[];
  path?: string;
  fileFilter?: MulterOptions["fileFilter"];
  limits?: MulterOptions["limits"];
}

export const LocalFilesInterceptor = (
  options: FileFieldsInterceptorOptions
): Type<NestInterceptor> => {
  @Injectable()
  class Interceptor implements NestInterceptor {
    fileInterceptor: NestInterceptor;
    constructor() {
      const filesDestination =
        process.env.UPLOAD_FILE_DETINATION ?? "./uploads";

      const destination = `${filesDestination}${options.path}`;

      const multerOptions: MulterOptions = {
        storage: diskStorage({
          destination,
        }),
        fileFilter: options.fileFilter,
        limits: options.limits,
      };

      this.fileInterceptor = new (FileFieldsInterceptor(
        options.files,
        multerOptions
      ))();
    }

    intercept(...args: Parameters<NestInterceptor["intercept"]>) {
      return this.fileInterceptor.intercept(...args);
    }
  }
  return mixin(Interceptor);
};
