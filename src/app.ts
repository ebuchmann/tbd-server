import * as Koa from 'koa';
import * as IO from 'koa-socket';
import * as Knex from 'knex';

import { router } from './routes';
import { Model } from 'objection';

const app = new Koa();
const io = new IO();
const port = 3000;
const knexConfig = require('../knexfile');

export const knex = Knex(knexConfig.development);

Model.knex(knex);

app.use(router.routes());

app.listen(port, () => console.log(`Listening on port ${port}`));
