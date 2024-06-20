import { Injectable, Type } from '@nestjs/common';

import { PolicyHandler } from '../../application/policy/policy-handler.interface';
import { Policy } from '../../application/policy/policy.interface';

@Injectable()
export class PolicyHandlerStorage {
  private readonly collection = new Map<Type<Policy>, PolicyHandler<any>>();

  add<T extends Policy>(PolicyCls: Type<T>, handler: PolicyHandler<T>) {
    this.collection.set(PolicyCls, handler);
  }

  get<T extends Policy>(PolicyCls: Type<T>): PolicyHandler<T> | undefined {
    const handler = this.collection.get(PolicyCls);

    if (!handler) {
      throw new Error(
        `"${PolicyCls.name}" does not have the associated handler`,
      );
    }

    return handler;
  }
}
