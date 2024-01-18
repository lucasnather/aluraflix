import { InMemoryCategoriesRepository } from '@/repository/in-memory/in-memory-categories-repository'
import { FindCategoryByIdService } from './find-category-by-id-service'

let categoryRepository: InMemoryCategoriesRepository
let sut: FindCategoryByIdService

describe('Finf Category By IDService', () => {

	beforeEach(() => {
		categoryRepository = new InMemoryCategoriesRepository()
		sut = new FindCategoryByIdService(categoryRepository)
	})

	it('should be able to find categories by id', async () => {
		await categoryRepository.create({
			title: 'comedy',
			color: 'green'
		})

		const { category } = await sut.handle({
			id: 1
		})

		expect(category).toEqual(expect.objectContaining({
			id: expect.any(Number),
			title: 'comedy',
			createdAt: expect.any(Date)
		}))
	})

	it('shouldn`t be able to find a category by id', async () => {
		expect( async() => {
			await sut.handle({
				id: 100
			})
		}).rejects.toBeInstanceOf(Error)
	})
})