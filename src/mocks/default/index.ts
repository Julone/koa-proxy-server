import Router from 'koa-router';
import koa from 'koa';
import Mock from 'mockjs';
import bodyParser from 'koa-bodyparser';

const router = new Router();
router.use(bodyParser());// bodyParse, 转移到router里面

router.get('/demo', async (ctx: koa.Context, next: Function) => {
    ctx.body = true;
    // await next() // 不可以next, 否则将会往下面走
});
router.get('/superuser', async (ctx: koa.Context, next: Function) => {
    ctx.body = { ok: true }
});
router.post('/superuser', async (ctx: koa.Context, next: Function) => {
    console.log(ctx.request.body)
    ctx.body = { ok: true }
});

export default router;