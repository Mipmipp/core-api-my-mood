import { EntitySchema } from 'typeorm';

import { withBaseSchemaColumns } from '@/common/infrastructure/persistence/base.schema';

import { User } from '../../domain/user.entity';

export const UserSchema = new EntitySchema<User>({
  name: 'User',
  target: User,
  tableName: 'user',
  columns: withBaseSchemaColumns({
    username: {
      type: String,
      nullable: false,
    },
    email: {
      type: String,
      unique: true,
      nullable: false,
    },
    password: {
      type: String,
      nullable: false,
      select: false,
    },
  }),
});
