import { Module } from '@nestjs/common';
import { NestjsBootstrapService } from './nestjs-bootstrap.service';

@Module({
  providers: [NestjsBootstrapService],
  exports: [NestjsBootstrapService],
})
export class NestjsBootstrapModule {}
