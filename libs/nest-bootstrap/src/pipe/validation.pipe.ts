import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class ValidationPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    console.log(value, 'ValidationPipe.transform:接收参数(value)');
    if (!metadata.metatype || !this.toValidate(metadata.metatype)) {
      return value;
    }
    const object = plainToInstance(metadata.metatype, value);
    const errors = await validate(object);
    if (errors.length) {
      console.log(
        {
          BodyError: errors,
        },
        'ValidationPipe.transform:Error',
      );
      const errorObjs = errors[0].constraints;
      if (typeof errorObjs === 'object') {
        const errProps = Object.keys(errorObjs as object);
        if (errProps.length) {
          const firstError = errorObjs[errProps[0]];
          throw new BadRequestException(firstError);
        }
      }
    } else {
      console.log(
        {
          BodySuccess: 'Success',
        },
        'ValidationPipe.transform:Success',
      );
    }
    return value;
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  private toValidate(metatype: Function): boolean {
    // eslint-disable-next-line @typescript-eslint/ban-types
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
