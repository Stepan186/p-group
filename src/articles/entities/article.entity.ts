import { BaseEntity, Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { SignEnum } from '../utils/enums/sign.enum';

@Entity()
export class Article extends BaseEntity<Article, 'id'> {
  @PrimaryKey()
  id: number;

  @Property()
  title: string;

  @Property()
  description: string;

  @Property()
  tags: string[];

  @Property({ type: 'enum' })
  sign: SignEnum;

  @Property({})
  createdAt = new Date();
}
