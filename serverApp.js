import http from 'http';
import Koa from 'koa';
import router from './routes/router';
import koaBody from 'koa-body';

const app = new Koa();

app.use(koaBody({ json: true }));

app.use(async (ctx, next) => {
    const origin = ctx.request.get('Origin');
    if (!origin) {
        return await next();
    }

    const headers = { 'Access-Control-Allow-Origin': '*' };

    if (ctx.request.method !== 'OPTIONS') {
        ctx.response.set({ ...headers });
        try {
            return await next();
        } catch (e) {
            e.headers = { ...e.headers, ...headers };
            throw e;
        }
    }

    if (ctx.request.get('Access-Control-Request-Method')) {
        ctx.response.set({
            ...headers,
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH',
        });

        if (ctx.request.get('Access-Control-Request-Headers')) {
            ctx.response.set(
                'Access-Control-Allow-Headers',
                ctx.request.get('Access-Control-Request-Headers')
            );
        }

        ctx.response.status = 204;
    }
});

app.use(router());

const port = process.env.PORT || 9091;
http.createServer(app.callback()).listen(port);
