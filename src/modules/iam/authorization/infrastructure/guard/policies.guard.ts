import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Type,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';

import { Policy } from '../../application/policy/policy.interface';
import { POLICIES_KEY } from '../decorator/policies.decorator';
import { PolicyHandlerStorage } from '../storage/policy-handler.storage';

@Injectable()
export class PoliciesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly policyHandlerStorage: PolicyHandlerStorage,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const policies = this.getPoliciesFromContext(context);

    if (policies) {
      try {
        await Promise.all(
          policies.map((policy) => {
            const policyHandler = this.policyHandlerStorage.get(
              policy.constructor as Type,
            );

            return policyHandler.handle(
              policy,
              this.getRequestFromContext(context),
            );
          }),
        );
      } catch (err) {
        throw err;
      }
    }

    return true;
  }

  private getPoliciesFromContext(context: ExecutionContext): Policy[] {
    return this.reflector.getAllAndOverride<Policy[]>(POLICIES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
  }

  private getRequestFromContext(context: ExecutionContext): Request {
    return context.switchToHttp().getRequest();
  }
}
