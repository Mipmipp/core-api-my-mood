import { Request } from 'express';

import { IPolicy } from './policy.interface';

export interface PolicyHandler<T extends IPolicy> {
  handle(policy: T, request: Request): Promise<void>;
}
