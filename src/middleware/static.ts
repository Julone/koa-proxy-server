import staticMiddle from "koa-static"
import path from 'path';

export const setupStaticResource = (app) => {
    app.use(staticMiddle(path.join(__dirname, "../../public/")));
    app.use(staticMiddle(path.join(__dirname, "../../public/dist")));
}