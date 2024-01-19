import { VideosNotFoundError } from '@/erros/videos-not-found-error'
import { makeGetVideosByID } from '@/factory/video/make-get-videos-by-id'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function getById(request: FastifyRequest, reply: FastifyReply) {

	const getParamsSchema = z.object({
		id: z.string()
	})

	const { id } = getParamsSchema.parse(request.params)

	const createVideosService = makeGetVideosByID()

	try {
		const { video } = await createVideosService.handle({
			id
		})

		return reply.status(200).send(video)
	} catch(e) {
		if(e instanceof VideosNotFoundError) {
			return reply.status(404).send({
				message: e.message
			})
		}
	}
}