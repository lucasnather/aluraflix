import { VideosNotFoundError } from '@/erros/videos-not-found-error'
import { makeGetVideos } from '@/factory/video/make-get-videos'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function get(request: FastifyRequest, reply: FastifyReply) {

	const createVideosService = makeGetVideos()

	try {
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