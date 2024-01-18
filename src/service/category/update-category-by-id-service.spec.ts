import { InMemoryCategoriesRepository } from '@/repository/in-memory/in-memory-categories-repository'
import { UpdateCategoryByIdService } from './update-category-by-id-service'

let categoryRepository: InMemoryCategoriesRepository
let sut: UpdateCategoryByIdService

describe('Update Category By ID Service', () => {

	beforeEach(() => {
		categoryRepository = new InMemoryCategoriesRepository()
		sut = new UpdateCategoryByIdService(categoryRepository)
	})

	it('should be able to update categories by id', async () => {
		await categoryRepository.create({
			title: 'comedy',
			color: 'green'
		})

		const { category } = await sut.handle({
			id: 1,
			color: 'gray'
		})

		expect(category).toEqual(expect.objectContaining({
			id: expect.any(Number),
			title: 'comedy',
			color: 'gray',
			createdAt: expect.any(Date)
		}))
	})

	it('shouldn`t be able to upddate a category with wrong id', async () => {
		await categoryRepository.create({
			title: 'comedy',
			color: 'green'
		})

		expect( async() => {
			await sut.handle({
				id: 100,
				title: 'terror',
				color: 'gray'
			})
		}).rejects.toBeInstanceOf(Error)
	})
})