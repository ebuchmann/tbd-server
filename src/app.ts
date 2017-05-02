import * as Koa from 'koa';
import * as IO from 'koa-socket';
import * as Knex from 'knex';
import * as bodyParser from 'koa-bodyparser';
import * as passport from 'koa-passport';
import * as session from 'koa-generic-session';
import * as PgStore  from 'koa-pg-session';

import { router } from './routes';
import { Model } from 'objection';

const app = new Koa();
const io = new IO();
const port = 3000;
const knexConfig = require('../knexfile');
const pgStore = new PgStore(knexConfig.development.connection);

export const knex = Knex(knexConfig.development);

Model.knex(knex);
app.keys = ['keys', 'keykeys'];
app.use(session({ store: pgStore }));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser());
app.use(router.routes());

(async () => {
  await pgStore.setup();
  app.listen(port, () => console.log(`Listening on port ${port}`));
})();
