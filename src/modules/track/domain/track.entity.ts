import { Base } from '@/common/domain/base.domain';
import { User } from '@/modules/user/domain/user.entity';

import { MoodType } from './mood.type';

export class Track extends Base {
  userId: number;
  user: User;
  day: number;
  month: number;
  year: number;
  mood: MoodType;
  note?: string;
}
