import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { map, Observable, tap } from 'rxjs';

export class TransformResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const startTime = Date.now();
    const startDate = new Date().toString();
    return next.handle().pipe(
      map((data) => {
        const CurDateTime = new Date().toString();
        if (!data) {
          //          this.logger.error(`返回的data有问题`);
          return data;
        }
        if (typeof data === 'string') {
          // this.logger.debug(`返回的data是字符串，当错误消息处理`);
          return {
            code: 1,
            message: data,
            msg: data,
            CurDateTime,
          };
        }
        if (Array.isArray(data)) {
          return {
            code: 200,
            data: {
              list: data,
            },
            CurDateTime,
          };
        }
        if (data.constructor === Object) {
          return {
            code: 200,
            data,
            CurDateTime,
          };
        }
        return data;
      }),
      tap(() => {
        const endTime = Date.now();
        const endDate = new Date().toString();
        const timeLength = endTime - startTime;
        console.log('TransformInterceptor.intercept.compute.runTime', {
          RunResultStr: `执行耗时：（${startDate}（开始时间） - ${endDate}（结束时间） = ${timeLength}ms）`,
          RunResultTime: timeLength,
        });
        // if (
        //   !context
        //     .switchToHttp()
        //     .getRequest<Request>()
        //     .url.includes('consul-health')
        // ) {
        //
        // }
      }),
    );
  }
}
