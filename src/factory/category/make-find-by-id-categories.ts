import { CategoriesRepository } from '@/repository/prisma/categories-repository'
import { FindCategoryByIdService } from '@/service/category/find-category-by-id-service'

export function makeFindByIdCategories() {

	const categoryRepository = new CategoriesRepository()
	const findByIdCategories = new FindCategoryByIdService(categoryRepository)

	return findByIdCategories
}