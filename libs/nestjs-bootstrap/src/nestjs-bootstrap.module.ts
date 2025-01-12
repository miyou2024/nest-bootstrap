import { Module } from '@nestjs/common';
import { NestBootstrapService } from './nest-bootstrap.service';

@Module({
  providers: [NestBootstrapService],
  exports: [NestBootstrapService],
})
export class NestBootstrapModule {}
