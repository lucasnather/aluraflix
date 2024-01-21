
import { authenticate } from '@/controller/users/authenticate'
import { create } from '@/controller/users/create'
import { FastifyInstance } from 'fastify'

export async function userRoute(app: FastifyInstance) {

	app.post('/', create)
	app.post('/login', authenticate)
}
