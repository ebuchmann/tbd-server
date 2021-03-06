import * as passport from 'koa-passport';
import * as argon2 from 'argon2';
import * as Router from 'koa-router';
import { isAuthenticated } from '../auth';

export const router = new Router;
export const path = '/auth';

router.post('/login', async (ctx, _next) => {
  return passport.authenticate('local', (err, user, info, status) => {
    if (user === false) {
      ctx.body = { success: false };
      ctx.throw(401);
    } else {
      ctx.body = { user };
      return ctx.login(user);
    }
  })(ctx, _next);
});

router.get('/logout', async (ctx, _next) => {
  ctx.logout();
  ctx.status = 200;
});

router.get('/get-account', isAuthenticated, async (ctx, _next) => {
  ctx.body = ctx.session;
  ctx.status = 200;
});
