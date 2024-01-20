import { create } from '@/controller/category/create'
import { deleteById } from '@/controller/category/delete-by-id'
import { get } from '@/controller/category/get'
import { getById } from '@/controller/category/get-by-id'
import { update } from '@/controller/category/update'
import { FastifyInstance } from 'fastify'

export async function categoryRoute(app: FastifyInstance) {

	app.post('/', create)
	app.get('/', get)
	app.get('/:id', getById)
	app.delete('/:id', deleteById)
	app.put('/:id', update)
}
