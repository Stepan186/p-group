import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { Article } from './entities/article.entity';

@Controller('articles')
export class ArticlesController {
  constructor(
    @Inject(ArticlesService) private readonly articlesService: ArticlesService,
  ) {}

  @Post()
  create(@Body() dto): Promise<Article> {
    return this.articlesService.create(dto);
  }

  @Post('getOne')
  getOne(@Body() dto): Promise<Article> {
    return this.articlesService.getOne(dto);
  }

  @Post('getMany')
  getMany(@Body() dto): Promise<Article[]> {
    return this.articlesService.getMany(dto);
  }

  @Post('update')
  update(@Body() dto): Promise<Article> {
    return this.articlesService.update(dto);
  }

  @Post('delete')
  delete(@Body() dto) {
    this.articlesService.delete(dto);
  }
}
