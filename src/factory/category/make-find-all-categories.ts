import { CategoriesRepository } from '@/repository/prisma/categories-repository'
import { FindAllCategoriesService } from '@/service/category/find-all-categories-service'

export function makeFindAllCategories() {

	const categoryRepository = new CategoriesRepository()
	const findAllCategories = new FindAllCategoriesService(categoryRepository)

	return findAllCategories
}