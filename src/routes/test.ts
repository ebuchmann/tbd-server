import * as Router from 'koa-router';

export const router = new Router;
export const path = '/test';

router.get('/', async (ctx, _next) => {
  return ctx.body = 'help';
});
