import { InMemoryCategoriesRepository } from '@/repository/in-memory/in-memory-categories-repository'
import { FindAllCategoriesService } from './find-all-categories-service'

let categoryRepository: InMemoryCategoriesRepository
let sut: FindAllCategoriesService

describe('Create Category Service', () => {

	beforeEach(() => {
		categoryRepository = new InMemoryCategoriesRepository()
		sut = new FindAllCategoriesService(categoryRepository)
	})

	it('should be able to find all categories', async () => {
		await categoryRepository.create({
			id: 'meu-id',
			title: 'comedy',
			color: 'green'
		})

		const { category } = await sut.handle()

		expect(category).toHaveLength(1)
		expect(category).toEqual([expect.objectContaining({
			id: expect.any(String),
			title: 'comedy',
			createdAt: expect.any(Date)
		})])
	})

	it('shouldn`t be able to find a category', async () => {
		expect( async() => {
			await sut.handle()
		}).rejects.toBeInstanceOf(Error)
	})
})