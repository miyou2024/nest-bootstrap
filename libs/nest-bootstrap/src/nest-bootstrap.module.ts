import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { INestBootstrapOptions } from './nest-bootstrap.interface';
import { DynamicModule, ForwardReference, Module, Type } from '@nestjs/common';
import { NestBootstrapService } from './nest-bootstrap.service';

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
      providers: [NestBootstrapService],
      exports: [NestBootstrapService],
    };
  }
}
