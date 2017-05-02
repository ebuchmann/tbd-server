import { Middleware } from 'koa';

/**
 * make sure the named POST values are present in the body
 */
export function ensurePostValues(values: string[]): Middleware {
  const middleware: Middleware = async(ctx, next) => {
    const missing = values.filter(param => (ctx.request.body[param] === undefined));
    if (missing.length) {
      const msg = `Missing required POST values: ` +
        missing.join(', ');
      ctx.throw(400, msg);
    }
    return await next();
  };
  return middleware;
}
