import * as argon2 from 'argon2';
import { Account } from './models';

const passport = require('koa-passport');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const account = await Account.query().findById(id);
    done(null, { user: account });
  } catch (error) {
    done(error);
  }
});

/**
 * Handles authenticating a user (logging in calls this)
 */

const LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy(async (username, password, done) => {
  try {
    const [user] = await Account.query().where('username', username).limit(1);

    if (!user || !await argon2.verify(user.password, password)) done(null, false);

    done(null, user);
  } catch (error) {
    done(error);
  }
}));

/**
 * Authentication middleware
 */
export const isAuthenticated = async function (ctx, next) {
  if (!ctx.isAuthenticated()) { return ctx.status = 403; }
  return await next();
};
