import { VideosAlreadyExistsError } from '@/erros/video-already-exists-error'
import { makeCreateVideo } from '@/factory/make-create-video'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
    
	const getBodySchema = z.object({
		title: z.string().min(3, 'Min 3 characters'),
		description: z.string().min(3, 'Min 10 characters'),
		url: z.string().url('Must be a valid URL')
	})

	const { title, description, url } = getBodySchema.parse(request.body)

	const createVideosService = makeCreateVideo()

	try {
		const videos = await createVideosService.handle({
			title,
			description,
			url
		})

		return reply.status(201).send(videos)
	} catch(e) {
		if(e instanceof VideosAlreadyExistsError) {
			return reply.status(404).send({
				message: e.message
			})
		}
	}
}