import { ConfigModuleOptions } from '@nestjs/config';
import { ExternalDocumentationObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

export interface INestBootstrapOptions {
  configOptions?: ConfigModuleOptions;
  scheduler?: IBootstrapSchedulerOptions;
}

export interface IBootstrapSchedulerOptions {
  enabled?: boolean;
}

/**
 * SwaggerConfig
 */
export interface ISwaggerOptions {
  // docPath SwaggerModule.setup
  path: string;
  // setTitle
  titleParam: string;
  // setDescription
  descriptionParam: string;
  // setVersion
  versionParam: string;
  // addTag
  tagParam?: ISwaggerTagParam;
}

export interface ISwaggerTagParam {
  name: string;
  description?: string;
  externalDocs?: ExternalDocumentationObject;
}

export interface IHttpServerOptions {
  port: number | string;
  hostname: string;
  callback?: () => void;
}
