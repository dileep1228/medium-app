import { Hono } from 'hono'
import { userRouter } from './routers/user';
import { blogRouter } from './routers/blog';
import { cors } from 'hono/cors'


const app = new Hono<{
  Bindings : {
    DATABASE_URL: string,
    JWT_SECRET: string
  },
  Variables : {
		userId: string
	}
}>();

app.use('/*', cors())
app.route('/api/v1/user', userRouter);
app.route('/api/v1/blog', blogRouter);

export default app
