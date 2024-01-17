import { create } from '@/controller/video/create'
import { get } from '@/controller/video/get'
import { FastifyInstance } from 'fastify'

export async function videosRoute(app: FastifyInstance) {

	app.post('/', create)
	app.get('/', get)
}
