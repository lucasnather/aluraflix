import fastify from 'fastify'
import { ZodError } from 'zod'
import { categoryRoute } from './routes/category-route'
import { videosRoute } from './routes/videos-route'

export const app = fastify()

app.register(videosRoute, {
	prefix: '/videos'
})

app.register(categoryRoute, {
	prefix: '/category'
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