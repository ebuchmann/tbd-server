import * as Koa from 'koa';
import * as IO from 'koa-socket';

import { router } from './routes';

const app = new Koa();
const io = new IO();
const port = 3000;

class Monster {
  name: string;
  hp: number;
  str: number;
  def: number;
  exp: number;
  ap: number;

  constructor() {
    this.name = 'Dwarven Miner';
    this.hp = 10;
    this.str = 2;
    this.def = 1;
    this.exp = 50;
    this.ap = 2;
  }
}

class Player {
  hp: number;
  str: number;
  def: number;
  exp: number;
  ap: number;
  level: number;

  constructor() {
    this.exp = 0;
    this.str = 3;
    this.def = 3;
    this.level = 0;
  }
}

const levels = [
  { tnl: 500 },
  { tnl: 1200 },
  { tnl: 3400 },
];

io.attach(app);

const player = new Player();

let monster = null;
io.on('init-battle', (ctx, data) => {
  if (!monster) monster = new Monster();

  const num = Math.floor(Math.random() * 6) + 4;
  monster.hp -= num;

  if (monster.hp <= 0) {
    player.exp += monster.exp;
    monster = null;
  }

  if (player.exp >= levels[player.level].tnl) {
    player.level += 1;
  }

  ctx.socket.emit('battle', {
    next: 6000,
    enemy: monster,
    player,
  });
});

const handleCombat = (player, enemy) => {
  return {
    hp: enemy.hp - player.str,
  };
};

app.use(router.routes());

app.listen(port, () => console.log(`Listening on port ${port}`));
