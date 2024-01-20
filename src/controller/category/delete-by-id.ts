import { CategoryNotFoundError } from '@/erros/category-not-found-error'
import { makeDeleteByIdCategories } from '@/factory/category/make-delete-categories-by-id'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function deleteById(request: FastifyRequest, reply: FastifyReply) {

	const getParamSchema = z.object({
		id: z.coerce.number()
	})

	const { id } = getParamSchema.parse(request.params)

	const deleteByIdCategoriesService = makeDeleteByIdCategories()

	try {
		await deleteByIdCategoriesService.handle({
			id
		})

		return reply.status(203).send({
			message: 'Category deleted'
		})
	} catch(e) {
		if(e instanceof CategoryNotFoundError) {
			return reply.status(404).send({
				message: e.message
			})
		}
	}
}