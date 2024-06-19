import { Injectable } from '@nestjs/common';

@Injectable()
export class UtilsService {
  removePropertiesFromObject<T extends Record<string, any>>(
    obj: T,
    propertyNames: string[],
  ): T {
    const newObj = {} as T;
    Object.keys(obj).forEach((key) => {
      if (!propertyNames.includes(key)) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        newObj[key] = obj[key];
      }
    });
    return newObj;
  }
}
