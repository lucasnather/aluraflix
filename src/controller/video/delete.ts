import { VideosNotFoundError } from '@/erros/videos-not-found-error'
import { makeDeleteVideo } from '@/factory/video/make-delete-video'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function deleteByID(request: FastifyRequest, reply: FastifyReply) {

	const getParamsSchema = z.object({
		id: z.string()
	})

	const { id } = getParamsSchema.parse(request.params)

	const createVideosService = makeDeleteVideo()

	try {
		await createVideosService.handle({
			id
		})

		return reply.status(203).send({
			message: 'Video deleted'
		})
	} catch(e) {
		if(e instanceof VideosNotFoundError) {
			return reply.status(404).send({
				message: e.message
			})
		}
	}
}