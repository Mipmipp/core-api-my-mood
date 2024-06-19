import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { Author } from '@modules/author/domain/author.domain';

import { AuthorService } from '../application/service/author.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';

@Controller('author')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Post()
  async create(@Body() author: CreateAuthorDto): Promise<Author> {
    return this.authorService.create(author);
  }

  @Get()
  async findAll(): Promise<Author[]> {
    return this.authorService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Author> {
    return this.authorService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAuthor: UpdateAuthorDto,
  ): Promise<Author> {
    return this.authorService.update(+id, updateAuthor);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.authorService.remove(+id);
  }
}
