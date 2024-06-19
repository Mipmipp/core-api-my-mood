import { Base } from '@common/domain/base.domain';

import { Author } from '@modules/author/domain/author.domain';

export class Book extends Base {
  title: string;
  format: string;
  author: Author;
}
