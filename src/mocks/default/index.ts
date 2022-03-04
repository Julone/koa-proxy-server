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
    ctx.body = { ok: true };
});
router.delete('/managment', async (ctx: koa.Context, next: Function) => {
    console.log(ctx.request.query)
    ctx.body = { Ok: true, Msg: "不是白名单" }
});

export default router;