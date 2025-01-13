import { INestApplication, Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';
import { ISwaggerOptions } from './nest-bootstrap.interface';
import * as yaml from 'js-yaml';
import { readFileSync } from 'fs';
import * as bodyParser from 'body-parser';

export async function startApp(app: INestApplication) {
  // 获取配置实例
  const configService = app.get(ConfigService);

  const serverConfig = configService.get('server', {
    infer: true,
  });
  // console.log('serverConfig', serverConfig);
  app.setGlobalPrefix(serverConfig.httpApiPrefix);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  app.use(
    bodyParser.json({
      limit: '10mb',
    }),
  );

  // 开启跨域 tmp
  app.enableCors({});

  // 开启 cookie
  app.use(cookieParser());

  // [${await nodeGetPublicIp()}:${serviceConfig.Http.Port}]
  enableSwagger(app, {
    path: serverConfig.swaggerPath,
    titleParam: serverConfig.swaggerTitle,
    descriptionParam: `
    ${serverConfig.swaggerDesc}
    [nodeEnv=${serverConfig.nodeEnv}]
    [cloudEnv=${serverConfig.cloudEnv}]
    `,
    versionParam: new Date().toString(),
  });
  await app.listen(serverConfig.httpPort);
  Logger.log(
    `🚀 Application ${serverConfig.swaggerTitle} Server is running on: http://localhost:${serverConfig.httpPort}/${serverConfig.httpApiPrefix}`,
  );
  Logger.log(
    `🚀 Application ${serverConfig.swaggerTitle} Docs is running on: http://localhost:${serverConfig.httpPort}/docs`,
  );
}

/**
 * @author silence
 * 配置 Swagger
 * @param app 应用实例
 * @param options 配置参数
 * @return app 应用实例
 */
export function enableSwagger(app: INestApplication, options: ISwaggerOptions) {
  let swaggerBuild = new DocumentBuilder()
    .setTitle(options.titleParam)
    .setDescription(options.descriptionParam)
    .setVersion(options.versionParam);
  if (options.tagParam) {
    swaggerBuild = swaggerBuild.addTag(
      options.tagParam?.name,
      options.tagParam?.description,
      options.tagParam?.externalDocs,
    );
  }
  swaggerBuild = swaggerBuild.addCookieAuth();
  const swaggerConfig = swaggerBuild.build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup(options.path, app, document);

  return app;
}

export function initGlobalConfig(yamlConfigFile?: string) {
  return () => {
    const YAML_CONFIG_FILENAME = yamlConfigFile || 'config.yaml';

    //  const YAML_FILE_PATH = join(__dirname, YAML_CONFIG_FILENAME);
    //   console.log(process.env);
    const YAML_FILE_PATH = `${process.env['PWD'] || process.env['NX_WORKSPACE_ROOT']}/${YAML_CONFIG_FILENAME}`;
    console.info(`YAML_FILE_PATH`, YAML_FILE_PATH);

    return yaml.load(readFileSync(YAML_FILE_PATH, 'utf8')) as Record<
      string,
      any
    >;
  };
}
