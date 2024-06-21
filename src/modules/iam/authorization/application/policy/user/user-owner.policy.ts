import { ForbiddenException, Injectable } from '@nestjs/common';
import { Request } from 'express';

import { IAccessTokenPayload } from '@/modules/iam/authentication/application/service/authentication-provider.service.interface';
import { REQUEST_USER_KEY } from '@/modules/iam/iam.constants';
import { UserQueryService } from '@/modules/user/application/service/user.service';

import { PolicyHandlerStorage } from '../../../infrastructure/storage/policy-handler.storage';
import { PolicyHandler } from '../policy-handler.interface';
import { IPolicy } from '../policy.interface';

export class UserOwnerPolicy implements IPolicy {
  name = 'UserOwnResource';
  searchParam?: string;

  constructor(options?: { searchParam: string }) {
    this.searchParam = options?.searchParam || 'id';
  }
}

@Injectable()
export class UserOwnerPolicyHandler implements PolicyHandler<UserOwnerPolicy> {
  constructor(
    private readonly policyHandlerStorage: PolicyHandlerStorage,
    private readonly userQueryService: UserQueryService,
  ) {
    this.policyHandlerStorage.add(UserOwnerPolicy, this);
  }

  async handle(policy: UserOwnerPolicy, request: Request): Promise<void> {
    const currentUser: IAccessTokenPayload = request[REQUEST_USER_KEY];
    const currentUserFromDb = await this.userQueryService.findOneByEmailOrFail(
      currentUser.email,
    );

    if (policy.searchParam === 'email') {
      const userEmail = request.params[policy.searchParam];
      const userFromDb = await this.userQueryService.findOneByEmailOrFail(
        userEmail,
      );

      return this.isUserOwner(currentUserFromDb.id, userFromDb.id);
    }
  }

  private isUserOwner(currentUserId: number, userOwnerId: number): void {
    if (currentUserId !== userOwnerId) {
      throw new ForbiddenException('Users cannot manage foreign users.');
    }
  }
}
