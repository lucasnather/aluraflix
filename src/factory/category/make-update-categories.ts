import { CategoriesRepository } from '@/repository/prisma/categories-repository'
import { UpdateCategoryByIdService } from '@/service/category/update-category-by-id-service'

export function makeUpdateCategory() {

	const categoryRepository = new CategoriesRepository()
	const updateCategory = new UpdateCategoryByIdService(categoryRepository)

	return updateCategory
}