import { CategoryNotFoundError } from '@/erros/category-not-found-error'
import { makeFindByIdCategories } from '@/factory/category/make-find-by-id-categories'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function getById(request: FastifyRequest, reply: FastifyReply) {

	const getParamSchema = z.object({
		id: z.coerce.number()
	})

	const { id } = getParamSchema.parse(request.params)

	const findAllCategoriesService = makeFindByIdCategories()

	try {
		const { category } = await findAllCategoriesService.handle({
			id
		})

		return reply.status(200).send(category)
	} catch(e) {
		if(e instanceof CategoryNotFoundError) {
			return reply.status(404).send({
				message: e.message
			})
		}
	}
}