import { InMemoryCategoriesRepository } from '@/repository/in-memory/in-memory-categories-repository'
import { CreateCategoryService } from './create-category-service'

let categoryRepository: InMemoryCategoriesRepository
let sut: CreateCategoryService

describe('Create Category Service', () => {

	beforeEach(() => {
		categoryRepository = new InMemoryCategoriesRepository()
		sut = new CreateCategoryService(categoryRepository)
	})

	it('should be able to create a new category', async () => {
		const { category } = await sut.handle({
			title: 'comedy',
			color: 'blue'
		})

		expect(category).toEqual(expect.objectContaining({
			id: expect.any(String),
			title: 'comedy',
			createdAt: expect.any(Date)
		}))
	})

	it('shouldn`t be able to create a new category without a title', async () => {
		expect( async() => {
			await sut.handle({
				title: '',
				color: 'green'
			})
		}).rejects.toBeInstanceOf(Error)
	})
})