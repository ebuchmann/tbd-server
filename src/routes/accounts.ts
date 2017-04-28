import * as Router from 'koa-router';
import { models } from '../models';

export const router = new Router;
export const path = '/accounts';

router.get('/', async (ctx, _next) => {
  return ctx.body = await models.Monster.create({ name: 'Lion', hp: 40, exp: 150 });
});
