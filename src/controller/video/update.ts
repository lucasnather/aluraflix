import { VideosNotFoundError } from '@/erros/videos-not-found-error'
import { makeUpdateVideo } from '@/factory/video/make-update-videos'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function update(request: FastifyRequest, reply: FastifyReply) {

	const getBodySchema = z.object({
		title: z.string().min(3, 'Min 3 characters').optional(),
		description: z.string().min(3, 'Min 10 characters').optional(),
		url: z.string().url('Must be a valid URL').optional()
	})

	const getParamsSchema = z.object({
		id: z.string()
	})
    
	const { title, description, url } = getBodySchema.parse(request.body)
	const { id } = getParamsSchema.parse(request.params)

	const createVideosService = makeUpdateVideo()

	try {
		const { videos } = await createVideosService.handle({
			title,
			description,
			url,
			id
		})

		return reply.status(201).send(videos)
	} catch(e) {
		if(e instanceof VideosNotFoundError) {
			return reply.status(404).send({
				message: e.message
			})
		}
	}
}