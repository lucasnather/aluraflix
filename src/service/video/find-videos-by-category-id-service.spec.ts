import { VideosNotFoundError } from '@/erros/videos-not-found-error'
import { InMemoryVideosRepository } from '@/repository/in-memory/in-memory-videos-repository'
import { FindVideosByCategoryIdVideosService } from './find-videos-by-category-id-service'

let videosRepository: InMemoryVideosRepository
let sut: FindVideosByCategoryIdVideosService

describe('Find By id Videos Service', () => {

	beforeEach(() => {
		videosRepository = new InMemoryVideosRepository()
		sut = new FindVideosByCategoryIdVideosService(videosRepository)
	})

	it('should be able to find videos by category id', async () => {
		await videosRepository.create({
			id: 'video-id',
			title: 'video',
			description: 'descricao do video',
			categories_id: 2,
			url: 'http://aaaa.com.br'
		})

		const { video } = await sut.handle({
			categoryId: 2
		})

		expect(video).toHaveLength(1)
		expect(video).toEqual([expect.objectContaining({
			id: expect.any(String),
			description: 'descricao do video',
		})])
	})

	it('shouldn`t be able to find videos with wrong category id id', async () => {

		expect(async () => {
			await sut.handle({
				categoryId: 50
			})
		}).rejects.toBeInstanceOf(VideosNotFoundError)
	})
})