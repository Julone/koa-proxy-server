import Koa from 'koa'; // koa框架
import getConfig from './config';
import * as http from 'http';
import globalLogger from './utils/logger/globalLog'
import logMiddle from './middleware/log'
// 路由分发
import setupRouter from './router/index';
import { setupBasicProxy, setupNetworkProxy, setupStaticProxy } from "./proxy/index";
// 中间件
import cors from './middleware/cors';
import bodyParser from 'koa-bodyparser';
import { setupStaticResource } from './middleware/static';
import setupMock from './mocks';
import Router from 'koa-router';
import conditional from 'koa-conditional-get'
import etag from 'koa-etag'
import setupSocket from './socket';
import session from './middleware/session';
// 通用设置
globalLogger()
//环境
const env = process.env.NODE_ENV;

/**
 * [基础服务器]开始
 */
const app = new Koa(); // 新建一个koa应用
const server = http.createServer(app.callback());
const PORT: number | string = getConfig(env).basePort;
app.use(cors);
app.use(logMiddle());
session(app)
setupStaticResource(app); // static
const io = setupSocket(server); //web socket
// app.use(bodyParser({})); // bodyParser会导致proxy中的POST等失效, 请转移到router里面
setupMock(app); //mock
setupRouter(app); //router
setupBasicProxy(app); // proxy

server.listen(app.listen(PORT)); // 监听应用端口
export {io, app};
/**
 * [网络服务器]
 */
const app2 = new Koa();
const server2 = http.createServer(app2.callback());
setupNetworkProxy(app2, 4200); // 网络代理到本地4200
server2.listen(app2.listen(9019));

/**
 * [静态服务器]
 */
const app3 = new Koa();
const server3 = http.createServer(app3.callback());
app3.use(logMiddle()); 
app3.use(conditional());
app3.use(etag());
setupStaticResource(app3); // static
setupStaticProxy(app3); // proxy
server3.listen(app3.listen(9097));
/**
 * 地址日志
 */
global.log.error(`----------------------------------------------`);
global.log.info(`Basic   Server running on port http://10.0.16.77:${PORT}`);
global.log.info(`Network Server running on port http://10.0.16.77:9019`);
global.log.info(`Static  Server running on port http://10.0.16.77:${9097}`);

/**
 * [测试服务器]
 */
const appTest = new Koa();
const serverTest = http.createServer(appTest.callback());

const r = new Router();
r.get('/', async (ctx) => {
    ctx.set("Keep-Alive", "none")
    ctx.body = "hello test".repeat(100000)
})
appTest.use(conditional());
appTest.use(etag());
appTest.use(r.routes());

serverTest.listen(appTest.listen(9094));