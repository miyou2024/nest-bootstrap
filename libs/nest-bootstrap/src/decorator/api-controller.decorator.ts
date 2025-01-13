import { applyDecorators, Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

/**
 * merge Controller,ApiTags decorator
 * @param path ->Controller
 * @param tag -> ApiTags
 * @constructor
 */
export function ApiControllerDecorator(path: string, tag: string) {
  return applyDecorators(Controller(path), ApiTags(tag));
}
