import { create } from '@/controller/category/create'
import { get } from '@/controller/category/get'
import { getById } from '@/controller/category/get-by-id'
import { FastifyInstance } from 'fastify'

export async function categoryRoute(app: FastifyInstance) {

	app.post('/', create)
	app.get('/', get)
	app.get('/:id', getById)
}
