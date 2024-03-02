import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'


export const blogRouter = new Hono<{
  Bindings : {
    DATABASE_URL: string,
    JWT_SECRET: string
  },
  Variables : {
		userId: string
	}
}>();


// middleware
blogRouter.use('/*', async (c, next) => {
    console.log("in blog middleware");
  const header =  c.req.header("Authorization")|| "";
  const token = header.split(" ")[1];
  const response = await verify(token, c.env.JWT_SECRET);
  if(!response){
    c.status(401);
    return c.json({ error: "authorization failed" });
  }
  c.set('userId', response.id);
  await next();
})

blogRouter.post('/', (c) => {
  console.log(c.get('userId'));
  return c.text("in post /api/v1/blog");
})

blogRouter.put('/', (c)=>{
  return c.text("in put /api/v1/blog");
})

blogRouter.get('/:id',(c)=>{
  const id = c.req.param('id');
  console.log(id);
  return c.text("in get /api/v1/blog/:id");
})

blogRouter.get('/bulk',(c)=>{
  return c.text("in get /api/v1/blog/bulk");
})
 
