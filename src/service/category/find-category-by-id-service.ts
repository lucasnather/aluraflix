import { CategoryNotFoundError } from '@/erros/category-not-found-error'
import { ICategories } from '@/interface/i-categories'
import { Categories } from '@prisma/client'

interface FindCategoryByIdRequest {
    id: string
}

interface FindCategoryByIdResponse {
    category: Categories
}

export class FindCategoryByIdService {

	constructor(private categoryRepository: ICategories) {}

	async handle(data: FindCategoryByIdRequest): Promise<FindCategoryByIdResponse> {
		const category = await this.categoryRepository.findById(data.id)

		if(!category) throw new CategoryNotFoundError()

		return {
			category
		}
	}
}