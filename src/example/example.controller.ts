import { ApiController, ApiMethod } from '@ittlr/nest-bootstrap';
import { Body, ParseIntPipe, Query } from '@nestjs/common';
import { ExampleDto } from './example.dto';

@ApiController('example', 'Example.示例')
export class ExampleController {
  @ApiMethod(
    'post',
    'get-list',
    {
      summary: 'example api swagger title',
      description: 'example api swagger desc',
    },
    {
      docQuery: [
        {
          name: 'id',
          description: '主键ID',
          required: true,
        },
      ],
    },
  )
  async getList(
    @Body() body: ExampleDto,
    @Query('id', ParseIntPipe) id: number,
  ) {
    return {
      body,
      id,
    };
  }
}
