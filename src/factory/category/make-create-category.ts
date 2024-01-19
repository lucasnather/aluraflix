import { CategoriesRepository } from '@/repository/prisma/categories-repository'
import { CreateCategoryService } from '@/service/category/create-category-service'

export function makeCreateCategory() {

	const categoryRepository = new CategoriesRepository()
	const createCategory = new CreateCategoryService(categoryRepository)

	return createCategory
}