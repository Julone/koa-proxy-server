import { Options } from 'http-proxy-middleware/dist/types';
import * as Koa from 'koa';
import Router from 'koa-router';
import proxy from './proxy-service'//引入代理模块

const api = [
    '/upr-luamemory',
    '/upr-luasingle',
    '/upr-luarange'
];

const proxyFeatureLua = api.reduce((t, el) => {
    t[el] = {
        target: "http://10.0.0.140:10099/",
        changeOrigin: false, //使用自己的
    }
    return t;
}, {})


const options: { targets: { [proxyName: string]: Options } } = {
    targets: {
        ...proxyFeatureLua,
        '**': {
            target: 'http://10.0.0.140:10099/',
            changeOrigin: false, //使用自己的
            pathRewrite: {

                '^/api': '/'
            }
        }
    }
}

export function setupBasicProxy(app) {
    app.use(proxy(options))
}


export function setupNetworkProxy(app, port = 4200) {
    const newworkOptions = {
        targets: {
            '/(.*)': {
                target: `http://localhost:${port}/`,
                changeOrigin: false, //使用自己的
            },
        }
    }
    app.use( (ctx: Koa.Context, next) => {
        function getClientIP(req) {
            return req.headers['x-forwarded-for'] || // 判断是否有反向代理 IP
            req.connection?.remoteAddress || // 判断 connection 的远程 IP
            req.socket?.remoteAddress || // 判断后端的 socket 的 IP
            req.connection?.socket?.remoteAddress;
        };
        const ipv6 = getClientIP(ctx.request);

        if([/\/assets/, /\.js/,/.woff2/, /\/sockjs-node/, /\.css/, /\.(png|jpeg)/, /\/SCREEN/].every(el=> !el.test(ctx.req.url) )){
            global.log.warn(`host: ${ipv6}, url: ${ctx.req.url}`);
        }
        clearTimeout(global.timer);
        global.timer = setTimeout(()=> {
            if (global.log) {
                // global.log.error(`响应时间为${responseTime / 1000}s`);
                global.log.error(`---------------------------------------------->`);
                global.log.warn(`Network Server running on port http://10.0.16.77:9019`);
                global.log.error(`<----------------------------------------------`);
            }
        }, 2000)
        next();
    })
    app.use(proxy(newworkOptions));
}

export function setupStaticProxy(app) {

    const router = new Router();
    
    router.get("/overview", async (ctx: Koa.Context, next: Function) => {
        ctx.status = 404;
        ctx.redirect('/index.html')
    })
    app.use(router.routes()).use(router.allowedMethods());

    app.use(proxy(options), {});
}
