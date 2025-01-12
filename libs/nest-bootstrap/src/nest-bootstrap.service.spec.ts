import { Test, TestingModule } from '@nestjs/testing';
import { NestBootstrapService } from './nest-bootstrap.service';

describe('NestBootstrapService', () => {
  let service: NestBootstrapService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NestBootstrapService],
    }).compile();

    service = module.get<NestBootstrapService>(NestBootstrapService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
