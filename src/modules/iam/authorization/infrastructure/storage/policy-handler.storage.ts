import { Injectable, Type } from '@nestjs/common';

import { PolicyHandler } from '../../application/policy/policy-handler.interface';
import { IPolicy } from '../../application/policy/policy.interface';

@Injectable()
export class PolicyHandlerStorage {
  private readonly collection = new Map<Type<IPolicy>, PolicyHandler<any>>();

  add<T extends IPolicy>(PolicyCls: Type<T>, handler: PolicyHandler<T>) {
    this.collection.set(PolicyCls, handler);
  }

  get<T extends IPolicy>(PolicyCls: Type<T>): PolicyHandler<T> | undefined {
    const handler = this.collection.get(PolicyCls);

    if (!handler) {
      throw new Error(
        `"${PolicyCls.name}" does not have the associated handler`,
      );
    }

    return handler;
  }
}
