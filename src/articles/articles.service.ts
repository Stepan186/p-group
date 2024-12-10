import { Injectable } from '@nestjs/common';
import { Article } from './entities/article.entity';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { FilterQuery } from '@mikro-orm/core';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article)
    private repo: EntityRepository<Article>,
  ) {}

  async create(dto) {
    const article = this.repo.create(dto);
    this.repo.getEntityManager().persist(article);
    return article;
  }

  async getOne(id: number): Promise<Article> {
    return await this.repo.findOneOrFail(id);
  }

  async getMany(dto): Promise<Article[]> {
    const where: FilterQuery<Article> = {};

    if (dto.tags) {
      where.$in = dto.tags;
    }

    return await this.repo.find(where, {
      limit: dto.limit,
      offset: dto.offset,
    });
  }

  async update(dto): Promise<Article> {
    const article = await this.repo.findOneOrFail(dto.id);
    this.repo.assign(article, dto);
    this.repo.getEntityManager().persist(article);
    return article;
  }

  async delete(dto) {
    const article = await this.repo.findOneOrFail(dto.id);
    await this.repo.nativeDelete(article);
  }
}
