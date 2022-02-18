import Router from 'koa-router';
import koa from 'koa';
const router = new Router();

router.get('/koa', async (ctx: koa.Context, next: Function) => {
    ctx.body = 'hello koa!'
    await next()
})

module.exports = router