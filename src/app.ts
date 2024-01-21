import fastify from 'fastify'
import fastifyJwt from '@fastify/jwt'
import { ZodError } from 'zod'
import { categoryRoute } from './routes/category-route'
import { videosRoute } from './routes/videos-route'
import { env } from './env/env'
import { userRoute } from './routes/users-route'

export const app = fastify()

app.register(fastifyJwt, {
	secret: env.SECRET,
	
})

app.register(videosRoute, {
	prefix: '/videos'
})

app.register(categoryRoute, {
	prefix: '/category'
})

app.register(userRoute, {
	prefix: '/user'
})

app.setErrorHandler((error, _, reply) => {
	if(error instanceof ZodError) {
		return reply.status(401).send({
			message: 'Validation Error',
			issues: error.format()
		})
	}

	return reply.status(500).send({
		message: 'Server Internal Error'
	})
})