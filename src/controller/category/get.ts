import { CategoryNotFoundError } from '@/erros/category-not-found-error'
import { makeFindAllCategories } from '@/factory/category/make-find-all-categories'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function get(request: FastifyRequest, reply: FastifyReply) {


	const findAllCategoriesService = makeFindAllCategories()

	try {
		const { category } = await findAllCategoriesService.handle()

		return reply.status(200).send(category)
	} catch(e) {
		if(e instanceof CategoryNotFoundError) {
			return reply.status(404).send({
				message: e.message
			})
		}
	}
}