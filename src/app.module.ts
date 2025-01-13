import { initGlobalConfig, NestBootstrapModule } from '@ittlr/nest-bootstrap';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExampleController } from './example/example.controller';

@Module({
  imports: [
    NestBootstrapModule.register({
      configOptions: {
        load: [initGlobalConfig('config.yaml')],
      },
      scheduler: {
        enabled: true,
      },
    }),
  ],
  controllers: [AppController, ExampleController],
  providers: [AppService],
})
export class AppModule {}
