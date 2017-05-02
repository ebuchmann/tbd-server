import * as Router from 'koa-router';
import * as argon2 from 'argon2';
import { Monster, Account } from '../models';
import { ensurePostValues } from '../utils/ensureParams';

export const router = new Router;
export const path = '/accounts';

router.post('/create', ensurePostValues(['username', 'password', 'email']), async (ctx, next) => {
  const { username, password, email } = ctx.request.body;

  // Username or password is already in use
  const [test] = await Account.query().where('username', username).orWhere('email', email).limit(1);
  if (test) {
    ctx.status = 409;
    return;
  }

  const passHash = await argon2.hash(password, await argon2.generateSalt(32));
  const newUser = await Account.query().insert({ username, password: passHash, email });
  delete newUser.password;

  ctx.status = 201;
  ctx.body = newUser;
});
