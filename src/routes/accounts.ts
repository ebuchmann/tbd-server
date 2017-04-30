import * as Router from 'koa-router';
import { Monster } from '../models';

export const router = new Router;
export const path = '/accounts';

router.get('/', async (ctx, _next) => {
  return ctx.body = await Monster.query();
});
