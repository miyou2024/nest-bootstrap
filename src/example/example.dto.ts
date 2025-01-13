import { ApiProperty } from '@nestjs/swagger';

export class ExampleDto {
  @ApiProperty({
    description: '用户名',
  })
  userName: string;
}
