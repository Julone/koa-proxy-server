import Router from 'koa-router';
import koa from 'koa';
import {io} from './../../server'
const router = new Router();

router.get('/koa', async (ctx: koa.Context, next: Function) => {
ctx.session.username = "张三";

    const username = ctx.request.query.username;

    ctx.body = 'hello koa!';
    console.log(ctx.cookies.get("julone"));
    io.to('name-' + username).emit('logincallbak', username + ' have login')
    console.log(ctx.session)
})



module.exports = router