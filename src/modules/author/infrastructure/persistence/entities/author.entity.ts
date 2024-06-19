import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { BookEntity } from '@modules/book/infrastructure/persistence/entities/book.entity';

@Entity('author')
export class AuthorEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  password: string;

  @Column({
    default: 'active',
  })
  status: string;

  @OneToMany(() => BookEntity, (books) => books.author)
  books?: BookEntity[];
}
