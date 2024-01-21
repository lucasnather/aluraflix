import { create } from '@/controller/video/create'
import { deleteByID } from '@/controller/video/delete'
import { get } from '@/controller/video/get'
import { getById } from '@/controller/video/get-by-id'
import { update } from '@/controller/video/update'
import { jwtVerifyToken } from '@/middleware/jwt-verify-token'
import { FastifyInstance } from 'fastify'

export async function videosRoute(app: FastifyInstance) {

	app.addHook('onRequest', jwtVerifyToken)

	app.post('/', create)
	app.get('/', get)
	app.get('/:id', getById)
	app.delete('/:id',  deleteByID)
	app.put('/:id',  update)
}
