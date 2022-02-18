import Router from 'koa-router';
import koa from 'koa';
import Mock from 'mockjs';
const router = new Router();
// router.prefix("/people")
const mockPeople = Mock.mock({
    'peoples|5000': [{
        'id|+1': 1,
        'guid': '@guid',
        'name': '@cname',
        'age': '@integer(20, 50)',
        'birthday': '@date("MM-dd")',
        'address': '@county(true)',
        'email': '@email',
    }]
});
router.get('/people', async (ctx: koa.Context, next) => {
    ctx.body = ctx.query['id'] ? mockPeople['peoples'][ctx.query['id'] as any - 1] : mockPeople['peoples']
})

router.get('/people/:id', async (ctx, next) => {
    ctx.body = mockPeople['peoples'][ctx.params['id'] as any - 1]
})

router.post('/people', async (ctx, next) => {
    let postData = ctx.request.body
    let id = postData.id ? postData.id : 1
    ctx.body = mockPeople['peoples'][id - 1]
})

export default router