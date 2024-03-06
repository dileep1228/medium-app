import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'
import { signinInput, signupInput} from "@dileep1228/medium-app"

export const userRouter = new Hono<{
  Bindings : {
    DATABASE_URL: string,
    JWT_SECRET: string
  },
}>();

userRouter.post('/signup', async(c) => {
  const body = await c.req.json(); // Parse request body

  try {
    const { email, password, name } = signupInput.parse(body); // Validate input
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const user = await prisma.user.create({
      data: {
        email,
        password,
        name,
      },
    });

    const token = await sign({ id: user.id }, c.env.JWT_SECRET);

    return c.json({ token });
  } catch (error) {
    console.log("Error during signup:");
    c.status(411); // Return appropriate status code for validation failure
    return c.json({
      msg: "Invalid inputs", // Include error message in response for debugging
    });
  }
});



userRouter.post('/signin', async(c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
}).$extends(withAccelerate())

  const body = await c.req.json();

  const {success} = signinInput.safeParse(body);
  if(!success) {
    c.status(411);
    return c.json({
      msg : "inputs not correct"
    })
  }

  try{
    const user = await prisma.user.findUnique({
      where :{
        email : body.email,
        password : body.password
      }
    });

    if(!user){
      c.status(403);
      return c.json({ error: "user not found" });
    }

    const token = await sign({id : user.id}, c.env.JWT_SECRET);
    return c.json({token});
  }
  catch(e){
    c.status(403);
    return c.json({ error: "error while signing up" });
  }

})
 