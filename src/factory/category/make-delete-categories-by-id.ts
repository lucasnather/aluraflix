import { CategoriesRepository } from '@/repository/prisma/categories-repository'
import { DeleteCategoryByIdService } from '@/service/category/delete-category-by-id-service'

export function makeDeleteByIdCategories() {

	const categoryRepository = new CategoriesRepository()
	const deleteByIdCategories = new DeleteCategoryByIdService(categoryRepository)

	return deleteByIdCategories
}