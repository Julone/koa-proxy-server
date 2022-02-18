import * as fs from 'fs';
import * as koa from 'koa';
import * as Route from 'koa-router';

const setupMock = (app: koa) => {
    fs.readdirSync(__dirname).forEach((file: string) => {
        if (file === 'index.js' || file === 'index.js.map'|| file === 'index.ts' || file === 'index.ts.map') {
            return
        };
        const router: Route = require(`./${file}/index`).default;
        app.use(router.routes()).use(router.allowedMethods());
    })
};

export default setupMock