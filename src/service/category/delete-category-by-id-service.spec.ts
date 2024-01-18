import { InMemoryCategoriesRepository } from '@/repository/in-memory/in-memory-categories-repository'
import { DeleteCategoryByIdService } from './delete-category-by-id-service'

let categoryRepository: InMemoryCategoriesRepository
let sut: DeleteCategoryByIdService

describe('Delete Category By ID Service', () => {

	beforeEach(() => {
		categoryRepository = new InMemoryCategoriesRepository()
		sut = new DeleteCategoryByIdService(categoryRepository)
	})

	it('should be able to delete categories by id', async () => {
		await categoryRepository.create({
			title: 'comedy',
			color: 'green'
		})

		const category = await sut.handle({
			id: 1
		})

		expect(category).toEqual(undefined)
	})

	it('shouldn`t be able to delete a category with wrong id', async () => {
		expect( async() => {
			await sut.handle({
				id: 100
			})
		}).rejects.toBeInstanceOf(Error)
	})
})