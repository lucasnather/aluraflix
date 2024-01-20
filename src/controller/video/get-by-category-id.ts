import { VideosNotFoundError } from '@/erros/videos-not-found-error'
import { makeGetVideosByCategoryId } from '@/factory/video/make-get-video-by-category-id'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function getByCategoryId(request: FastifyRequest, reply: FastifyReply) {

	const getParamsSchema = z.object({
		categoryId: z.coerce.number()
	})

	const { categoryId } = getParamsSchema.parse(request.params)

	const createVideosService = makeGetVideosByCategoryId()

	try {
		const { video } = await createVideosService.handle({
			categoryId
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