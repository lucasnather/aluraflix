import { InMemoryCategoriesRepository } from '@/repository/in-memory/in-memory-categories-repository'
import { InMemoryVideosRepository } from '@/repository/in-memory/in-memory-videos-repository'
import { CreateVideosService } from './create-videos-service'

let videosRepository: InMemoryVideosRepository
let categoryRepository: InMemoryCategoriesRepository
let sut: CreateVideosService

describe('Create Videos Service', () => {

	beforeEach(() => {
		videosRepository = new InMemoryVideosRepository()
		sut = new CreateVideosService(videosRepository, categoryRepository)
	})

	it('should be able to create a new video', async () => {
		const { videos } = await sut.handle({
			title: 'video top',
			description: 'venha ver meu video top',
			url: 'http://videotop.com.br'
		})

		expect(videos).toEqual(expect.objectContaining({
			id: expect.any(String),
			categories_id: 1,
			title: 'video top',
			createdAt: expect.any(Date)
		}))
	})

	it('shouldn`t be able to create a new video with a invalid url', async () => {
		expect( async() => {
			await sut.handle({
				title: 'title',
				description: 'venha ver meu video top',
				url: 'invalid url'
			})
		}).rejects.toBeInstanceOf(Error)
	})

	it('shouldn`t be able to create a new video without a title', async () => {
		expect( async() => {
			await sut.handle({
				title: '',
				description: 'venha ver meu video top',
				url: 'http://videotop.com.br'
			})
		}).rejects.toBeInstanceOf(Error)
	})

	it('shouldn`t be able to create a new video with min description caracters', async () => {
		expect( async() => {
			await sut.handle({
				title: 'video top',
				description: 'wrong',
				url: 'http://videotop.com.br'
			})
		}).rejects.toBeInstanceOf(Error)
	})

	it('shouldn`t be able to create a new video with a invalid categories id', async () => {
		expect( async() => {
			await sut.handle({
				title: 'video top',
				description: 'wrong',
				url: 'http://videotop.com.br',
				categories_id: 50
			})
		}).rejects.toBeInstanceOf(Error)
	})
})