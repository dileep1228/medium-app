import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'
import {createBlog, updateBlog } from "@dileep1228/medium-app"

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

blogRouter.post('/', async(c) => {
  console.log(c.get('userId'));
  const userId = c.get('userId');

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const body = await c.req.json();

  const {success} = createBlog.safeParse(body);
  if(!success) {
    c.status(411);
    return c.json({
      msg : "inputs not correct"
    })
  }

  const post = await prisma.post.create({
    data :{
      title : body.title,
      content : body.content,
      authorId : userId
    }
  });

  return c.json({
    id : post.id
  });
})

blogRouter.put('/', async(c)=>{
  const userId = c.get('userId');
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const body = await c.req.json();

  const {success} = updateBlog.safeParse(body);
  if(!success) {
    c.status(411);
    return c.json({
      msg : "inputs not correct"
    })
  }
  const updatePost = await prisma.post.update({
    where: {
      id: body.id,
      authorId: userId
    },
    data: {
      title: body.title,
      content: body.content
    }
  })
  return c.text("updated post");
})

blogRouter.get('/:id',async(c)=>{
  const id = c.req.param('id');
  console.log(id);
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const content = await prisma.post.findUnique({
    where: {
      id: id
    }
  })
  return c.json(content);
})

blogRouter.get('/bulk',async(c)=>{

  const userId = c.get('userId');
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const content = await prisma.post.findMany({});
  return c.json(content);
})
 
