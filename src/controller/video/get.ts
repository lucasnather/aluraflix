import { VideosNotFoundError } from '@/erros/videos-not-found-error'
import { makeGetVideos } from '@/factory/video/make-get-videos'
import { makeGetVideosByTitle } from '@/factory/video/make-get-videos-by-title'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function get(request: FastifyRequest, reply: FastifyReply) {

	const getQuerySchema = z.object({
		title: z.string().optional()
	})

	const { title } = getQuerySchema.parse(request.query)

	const getVideosByTitleService = makeGetVideosByTitle()
	const createVideosService = makeGetVideos()

	try {
		if(title) {
			const { video } = await getVideosByTitleService.handle({
				title
			})

			return reply.status(200).send(video)
		}

		const { videos } = await createVideosService.handle()

		return reply.status(200).send(videos)
	} catch(e) {
		if(e instanceof VideosNotFoundError) {
			return reply.status(404).send({
				message: e.message
			})
		}
	}
}