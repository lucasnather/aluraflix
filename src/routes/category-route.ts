import { create } from '@/controller/category/create'
import { deleteById } from '@/controller/category/delete-by-id'
import { get } from '@/controller/category/get'
import { getById } from '@/controller/category/get-by-id'
import { update } from '@/controller/category/update'
import { getByCategoryId } from '@/controller/video/get-by-category-id'
import { FastifyInstance } from 'fastify'

export async function categoryRoute(app: FastifyInstance) {

	app.post('/', create)
	app.get('/', get)
	app.get('/:id', getById)
	app.get('/category/:id', getByCategoryId)
	app.delete('/:id', deleteById)
	app.put('/:id', update)
}
