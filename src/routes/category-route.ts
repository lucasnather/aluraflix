import { create } from '@/controller/category/create'
import { get } from '@/controller/category/get'
import { FastifyInstance } from 'fastify'

export async function categoryRoute(app: FastifyInstance) {

	app.post('/', create)
	app.get('/', get)
}
