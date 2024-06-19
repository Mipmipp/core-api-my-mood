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
      unique: true,
    },
    customerId: {
      type: String,
      unique: true,
      nullable: true,
    },
    avatarPath: {
      type: String,
      unique: true,
      nullable: true,
    },
    thumbnailPath: {
      type: String,
      unique: true,
      nullable: true,
    },
    authProviderId: {
      type: String,
      unique: true,
      nullable: true,
    },
    nickname: {
      type: String,
      unique: true,
      nullable: true,
    },
    country: {
      type: String,
      nullable: true,
    },
    avatar: {
      type: String,
      nullable: true,
    },
    about: {
      type: String,
      nullable: true,
    },
    connectAccId: {
      type: String,
      nullable: true,
    },
  }),
});
