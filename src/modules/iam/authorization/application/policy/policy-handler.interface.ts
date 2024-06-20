import { Request } from 'express';

import { Policy } from './policy.interface';

export interface PolicyHandler<T extends Policy> {
  handle(policy: T, request: Request): Promise<void>;
}
