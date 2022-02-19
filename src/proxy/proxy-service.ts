import httpProxy, { Options } from 'koa2-proxy-middleware/node_modules/http-proxy-middleware'
import  { Options as Options2 ,fixRequestBody} from 'http-proxy-middleware'

export default (config, options = null) => {
  const k2c = require('koa2-connect');
  const pathToRegexp = require('path-to-regexp');
  return async function (ctx, next) {
    const commonOptions: Options2 = options || {
      logLevel: 'error',
    }
    const { targets = {} } = config;
    const { path } = ctx;
    for (const route of Object.keys(targets)) {
      if (pathToRegexp(route).test(path)) {
        await k2c(httpProxy({ ...targets[route], ...commonOptions }))(ctx, next);
        break;
      }
    }
    await next();
  };
};
