import { Exclude } from 'class-transformer';

import { Base } from '../../../common/domain/base.domain';

export class User extends Base {
  username: string;
  email: string;

  @Exclude()
  password: string;
}
