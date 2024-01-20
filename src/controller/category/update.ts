import { CategoryNotFoundError } from '@/erros/category-not-found-error'
import { makeUpdateCategory } from '@/factory/category/make-update-categories'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function update(request: FastifyRequest, reply: FastifyReply) {
    
	const getBodySchema = z.object({
		title: z.string().optional(),
		color: z.string().optional(),
	})

	const getParamSchema = z.object({
		id: z.coerce.number()
	})

	const { title, color} = getBodySchema.parse(request.body)
	const { id } = getParamSchema.parse(request.params)

	const createCategoryService = makeUpdateCategory()

	try {
		await createCategoryService.handle({
			title,
			color,
			id
		})

		return reply.status(203).send({
			message: 'Category update'
		})
	} catch(e) {
		if(e instanceof CategoryNotFoundError) {
			return reply.status(404).send({
				message: e.message
			})
		}
	}
}