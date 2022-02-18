import * as koa from 'koa';
import getConfig from '../config';
const env = process.env.NODE_ENV
const PORT: number | string = getConfig(env).basePort;

const log = () => {
    return async (ctx: koa.Context, next: Function) => {
        // 记录请求开始的时间
        const start = Date.now();
        await next();
        // 记录完成的时间 作差 计算响应时间
        const responseTime = Date.now() - start;
        // global.log.info("ip: "+ ctx.request.host," url: "+ ctx.request.url, );
        // clearTimeout(global.timer);
        // global.timer = setTimeout(()=> {
        //     if (global.log) {
        //         // global.log.error(`响应时间为${responseTime / 1000}s`);
        //         global.log.error(`----------------------------------------------`);
        //         global.log.warn(`Network Server running on port http://10.0.16.77:9019`);
        //     }
        // }, 2000)
        // global.log.info(ctx.URL.href);
    
    }
};

export default log