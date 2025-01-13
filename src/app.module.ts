import { initGlobalConfig, NestBootstrapModule } from '@ittlr/nest-bootstrap';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

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
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
