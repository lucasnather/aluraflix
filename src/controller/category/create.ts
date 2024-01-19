import { CategoryAlreadyExistsError } from '@/erros/category-already-exists-error'
import { makeCreateCategory } from '@/factory/category/make-create-category'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
    
	const getBodySchema = z.object({
		title: z.string(),
		color: z.string(),
	})

	const { title, color} = getBodySchema.parse(request.body)

	const createCategoryService = makeCreateCategory()

	try {
		const { category } = await createCategoryService.handle({
			title,
			color
		})

		return reply.status(201).send(category)
	} catch(e) {
		if(e instanceof CategoryAlreadyExistsError) {
			return reply.status(404).send({
				message: e.message
			})
		}
	}
}