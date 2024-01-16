import { create } from '@/controller/video/create'
import { FastifyInstance } from 'fastify'

export async function videosRoute(app: FastifyInstance) {

	app.post('/', create)
}
