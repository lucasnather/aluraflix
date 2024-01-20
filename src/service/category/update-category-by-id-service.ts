import { CategoryNotFoundError } from '@/erros/category-not-found-error'
import { ICategories } from '@/interface/i-categories'
import { Categories } from '@prisma/client'

interface UpdateCategoryByIdRequest {
    title?: string
    color?: string
    id: number
}

interface UpdateCategoryByIdResponse {
    category: Categories
}

export class UpdateCategoryByIdService {

	constructor(private categoryRepository: ICategories) {}

	async handle(data: UpdateCategoryByIdRequest): Promise<UpdateCategoryByIdResponse> {
		const findCategory = await this.categoryRepository.findById(data.id)

		if(!findCategory) throw new CategoryNotFoundError()

		const category = await this.categoryRepository.updateById(data, data.id)

		

		return {
			category
		}
	}
}