import { EntitySchema } from 'typeorm';

import { withBaseSchemaColumns } from '../../../../common/infrastructure/persistence/base.schema';
import { Track } from '../../domain/track.entity';

export const TrackSchema = new EntitySchema<Track>({
  name: 'Track',
  target: Track,
  tableName: 'track',
  columns: withBaseSchemaColumns({
    userId: {
      type: String,
      name: 'fk_user_id',
    },
    day: {
      type: Number,
    },
    month: {
      type: Number,
    },
    year: {
      type: Number,
    },
    mood: {
      type: String,
    },
    note: {
      type: String,
      nullable: true,
    },
  }),
  relations: {
    user: {
      type: 'many-to-one',
      target: 'User',
      inverseSide: 'tracks',
      joinColumn: {
        name: 'fk_user_id',
      },
    },
  },
});
