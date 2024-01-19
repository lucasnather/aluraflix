import { create } from '@/controller/category/create'
import { FastifyInstance } from 'fastify'

export async function categoryRoute(app: FastifyInstance) {

	app.post('/', create)

}
