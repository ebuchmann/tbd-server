import * as Koa from 'koa';
import * as IO from 'koa-socket';

import { router } from './routes';

const app = new Koa();
const io = new IO();
const port = 3000;

io.attach(app);

io.on( 'join', ( ctx, data ) => {
  console.log( 'join event fired', data )
})

app.use(router.routes());

app.listen(port, () => console.log(`Listening on port ${port}`));
