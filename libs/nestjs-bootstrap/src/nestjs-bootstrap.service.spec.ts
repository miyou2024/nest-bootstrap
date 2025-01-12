import { Test, TestingModule } from '@nestjs/testing';
import { NestjsBootstrapService } from './nestjs-bootstrap.service';

describe('NestjsBootstrapService', () => {
  let service: NestjsBootstrapService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NestjsBootstrapService],
    }).compile();

    service = module.get<NestjsBootstrapService>(NestjsBootstrapService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
