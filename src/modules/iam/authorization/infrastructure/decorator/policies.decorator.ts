import { SetMetadata } from '@nestjs/common';

import { IPolicy } from '../../application/policy/policy.interface';

export const POLICIES_KEY = 'policies';

export const Policies = (...policies: IPolicy[]) =>
  SetMetadata(POLICIES_KEY, policies);
