import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { DynamicModule, ForwardReference, Module, Type } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { INestBootstrapOptions } from './nest-bootstrap.interface';
import { NestBootstrapService } from './nest-bootstrap.service';
import { ValidationPipe } from './pipe';
import { TransformResponseInterceptor } from './interceptor';

@Module({})
export class NestBootstrapModule {
  static register(options?: INestBootstrapOptions): DynamicModule {
    const moduleImports: Array<
      Type<any> | DynamicModule | Promise<DynamicModule> | ForwardReference
    > = [];
    if (options) {
      if (
        options.configOptions &&
        options.configOptions.constructor === Object
      ) {
        if (Object.keys(options.configOptions).length) {
          const configImportModule = ConfigModule.forRoot({
            isGlobal: true,
            ...options.configOptions,
          });
          moduleImports.push(configImportModule);
        }
      }

      if (options.scheduler && options.scheduler.enabled) {
        moduleImports.push(ScheduleModule.forRoot());
      }
    }
    return {
      global: true,
      module: NestBootstrapModule,
      imports: [...moduleImports],
      providers: [
        {
          provide: APP_PIPE,
          useClass: ValidationPipe,
        },
        {
          provide: APP_INTERCEPTOR,
          useClass: TransformResponseInterceptor,
        },
        NestBootstrapService,
      ],
      exports: [NestBootstrapService],
    };
  }
}
