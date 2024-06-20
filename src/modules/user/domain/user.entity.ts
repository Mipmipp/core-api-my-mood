import { Track } from '@/modules/track/domain/track.entity';

import { Base } from '../../../common/domain/base.domain';

export class User extends Base {
  username: string;
  email: string;
  password: string;
  tracks?: Track[];
}
