import * as Router from 'koa-router';
import { Monster, Account } from '../models';

export const router = new Router;
export const path = '/accounts';

router.get('/', async (ctx, _next) => {
  const user = await Account.query().findById('dd6769b7-2012-40a7-a8fd-30e01904a63b');
  const test = await Account.query();
  return ctx.body = test;
  // return ctx.body = await Account.query().insert({ username: 'ebuchmann', password: 'test1234' });
});
