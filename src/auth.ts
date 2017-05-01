import * as argon2 from 'argon2';
import { Account } from './models';

const passport = require('koa-passport');

passport.serializeUser((user, done) => {
  done(null, user._id);
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
    const user = await Account.query().where('username', username).limit(1);

    if (!user) done(null, false);

    const match = await argon2.verify(user[0].password, password);

    if (user && match) {
      done(null, user);
    } else {
      done(null, false);
    }
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
