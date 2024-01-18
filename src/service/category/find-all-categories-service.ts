import { CategoryNotFoundError } from '@/erros/category-not-found-error'
import { ICategories } from '@/interface/i-categories'
import { Categories } from '@prisma/client'

interface FindAllCategoriesResponse {
    category: Categories[]
}

export class FindAllCategoriesService {

	constructor(private categoryRepository: ICategories) {}

	async handle(): Promise<FindAllCategoriesResponse> {
		const category = await this.categoryRepository.findAll()

		if(!category) throw new CategoryNotFoundError()

		return {
			category
		}
	}
}