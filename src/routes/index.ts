import * as fs from 'fs';
import * as path from 'path';
import * as Router from 'koa-router';

export const router = new Router();

router.prefix('/');

const basename = path.basename(module.filename);

const files = fs.readdirSync(__dirname).filter(f =>
    (f.indexOf('.') !== 0) &&                     // not hidden
    (f !== basename) &&                           // not this file
    (['.js', '.ts'].includes(path.extname(f))),   // is a .js or .ts file
);

files.forEach((f) => {
  // each file exports {path: <mount path>, router: <koa-router> object}
  const sub = require(path.join(__dirname, f));
  router.use(sub.path, sub.router.routes(), sub.router.allowedMethods());
});
