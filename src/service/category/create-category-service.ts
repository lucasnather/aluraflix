import { CategoryAlreadyExistsError } from '@/erros/category-already-exists-error'
import { ICategories } from '@/interface/i-categories'
import { Categories } from '@prisma/client'

interface CreateCategoryRequest {
    title: string,
    color: string,
}

interface CreateCategoryResponse {
    category: Categories
}

export class CreateCategoryService {

	constructor(private categoryRepository: ICategories) {}

	async handle(data: CreateCategoryRequest): Promise<CreateCategoryResponse> {
		const findCategory = await this.categoryRepository.findByTitleAndColor(data)

		if(findCategory) throw new CategoryAlreadyExistsError()

		const category = await this.categoryRepository.create(data)

		return {
			category
		}
	}
}