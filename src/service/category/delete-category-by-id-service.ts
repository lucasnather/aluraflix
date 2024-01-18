import { CategoryNotFoundError } from '@/erros/category-not-found-error'
import { ICategories } from '@/interface/i-categories'

interface DeleteCategoryByIdRequest {
    id: number
}

export class DeleteCategoryByIdService {

	constructor(private categoryRepository: ICategories) {}

	async handle(data: DeleteCategoryByIdRequest): Promise<void> {
		const category = await this.categoryRepository.findById(data.id)

		if(!category) throw new CategoryNotFoundError()

		await this.categoryRepository.deleteById(data.id)
	}
}