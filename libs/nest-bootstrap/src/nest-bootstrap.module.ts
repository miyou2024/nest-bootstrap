import { ConfigModule } from '@nestjs/config';
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
