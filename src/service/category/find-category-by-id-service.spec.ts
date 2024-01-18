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
			id: 'meu-id',
			title: 'comedy',
			color: 'green'
		})

		const { category } = await sut.handle({
			id: 'meu-id'
		})

		expect(category).toEqual(expect.objectContaining({
			id: expect.any(String),
			title: 'comedy',
			createdAt: expect.any(Date)
		}))
	})

	it('shouldn`t be able to find a category by id', async () => {
		expect( async() => {
			await sut.handle({
				id: 'wrong-id'
			})
		}).rejects.toBeInstanceOf(Error)
	})
})