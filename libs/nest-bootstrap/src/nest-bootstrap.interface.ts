import { ConfigModuleOptions } from '@nestjs/config';
import { ExternalDocumentationObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

export interface INestBootstrapOptions {
  configOptions?: ConfigModuleOptions;
  redisOptions?: IBootstrapRedisOptions;
  elasticSearchOptions?: IBootstrapElasticSearchOptions;
  scheduler?: IBootstrapSchedulerOptions;
}

export interface IBootstrapSchedulerOptions {
  enabled?: boolean;
}

export interface IBootstrapElasticSearchOptions {
  enabled: boolean;
  configKey?: string;
}

export interface IBootstrapRedisOptions {
  enabled: boolean;
  redisKey?: string;
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
