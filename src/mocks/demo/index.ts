import Router from 'koa-router';
import koa from 'koa';
import Mock from 'mockjs';
const router = new Router();

router.get('/demo', async (ctx: koa.Context, next: Function) => {
    ctx.body = [{
        code:1,
        data:32423
    }]
    // await next() // 不可以next, 否则将会往下面走
});

// router.get("/overview", async (ctx: koa.Context, next: Function) => {
//     ctx.status = 404;
//     ctx.redirect('/index.html')
// })

export default router;