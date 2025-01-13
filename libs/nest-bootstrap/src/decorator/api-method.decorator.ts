import {
  applyDecorators,
  Delete,
  Get,
  Head,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiQueryOptions } from '@nestjs/swagger';
import { ApiOperationOptions } from '@nestjs/swagger/dist/decorators/api-operation.decorator';

/**
 * merge Method.eg Get,Post... decorator
 * @param method ->request.method
 * @param path -> Get,Post...
 * @param doc ApiDocs
 * @param options queryDocs
 * @constructor
 */
export function ApiMethod(
  method:
    | 'get'
    | 'post'
    | 'put'
    | 'patch'
    | 'delete'
    | 'head'
    | 'options'
    | 'options',
  path: string,
  doc: ApiOperationOptions,
  options?: {
    docQuery?: ApiQueryOptions | ApiQueryOptions[];
  },
) {
  const fDoc: MethodDecorator[] = [];
  if (options) {
    if (options.docQuery) {
      if (!Array.isArray(options.docQuery)) {
        options.docQuery = [options.docQuery];
      }
      options.docQuery.forEach((doc) => {
        fDoc.push(ApiQuery(doc));
      });
    }
  }
  let f = Get(path);
  switch (method) {
    case 'post':
      f = Post(path);
      break;
    case 'put':
      f = Put(path);
      break;
    case 'patch':
      f = Patch(path);
      break;
    case 'delete':
      f = Delete(path);
      break;
    case 'head':
      f = Head(path);
      break;
  }
  let args = [f, ApiOperation(doc)];
  if (fDoc.length) {
    args = args.concat(fDoc);
  }
  return applyDecorators(...args, HttpCode(HttpStatus.OK));
}
