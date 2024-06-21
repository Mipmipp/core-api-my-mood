import { ForbiddenException, Injectable } from '@nestjs/common';
import { Request } from 'express';

import { IAccessTokenPayload } from '@/modules/iam/authentication/application/service/authentication-provider.service.interface';
import { REQUEST_USER_KEY } from '@/modules/iam/iam.constants';
import { TrackService } from '@/modules/track/application/service/track.service';
import { UserQueryService } from '@/modules/user/application/service/user.service';

import { PolicyHandlerStorage } from '../../../infrastructure/storage/policy-handler.storage';
import { PolicyHandler } from '../policy-handler.interface';
import { IPolicy } from '../policy.interface';

export class TrackOwnerPolicy implements IPolicy {
  name = 'TrackOwnResource';
  searchParam?: string;

  constructor(options?: { searchParam: string }) {
    this.searchParam = options?.searchParam || 'id';
  }
}

@Injectable()
export class TrackOwnerPolicyHandler
  implements PolicyHandler<TrackOwnerPolicy>
{
  constructor(
    private readonly policyHandlerStorage: PolicyHandlerStorage,
    private readonly trackService: TrackService,
    private readonly userQueryService: UserQueryService,
  ) {
    this.policyHandlerStorage.add(TrackOwnerPolicy, this);
  }

  async handle(policy: TrackOwnerPolicy, request: Request): Promise<void> {
    const currentUser: IAccessTokenPayload = request[REQUEST_USER_KEY];
    const currentUserFromDb = await this.userQueryService.findOneByEmailOrFail(
      currentUser.email,
    );

    if (policy.searchParam === 'userId') {
      const userId = Number(request.body[policy.searchParam]);

      return this.isTrackOwner(currentUserFromDb.id, userId);
    }

    const trackId = Number(request.params[policy.searchParam]);
    const subjectOrCondition = await this.trackService.findOneByIdOrFail(
      trackId,
    );

    if (!subjectOrCondition) {
      throw new Error(`Track with id ${trackId} not found.`);
    }

    return this.isTrackOwner(currentUserFromDb.id, subjectOrCondition.userId);
  }

  private isTrackOwner(currentUserId: number, trackOwnerId: number) {
    if (currentUserId !== trackOwnerId) {
      throw new ForbiddenException('Users cannot manage foreign tracks.');
    }
  }
}
