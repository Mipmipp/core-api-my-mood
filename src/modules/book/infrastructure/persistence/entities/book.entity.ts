import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { AuthorEntity } from '@modules/author/infrastructure/persistence/entities/author.entity';

@Entity('book')
export class BookEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  format: string;

  @ManyToOne(() => AuthorEntity, (author) => author.books)
  author: AuthorEntity;
}
