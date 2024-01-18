import { VideosNotFoundError } from '@/erros/videos-not-found-error'
import { InMemoryVideosRepository } from '@/repository/in-memory/in-memory-videos-repository'
import { FindVideosByTitleService } from './find-videos-by-title-service'

let videosRepository: InMemoryVideosRepository
let sut: FindVideosByTitleService

describe('Find By Title Videos Service', () => {

	beforeEach(() => {
		videosRepository = new InMemoryVideosRepository()
		sut = new FindVideosByTitleService(videosRepository)
	})

	it('should be able to find videos by id', async () => {
		await videosRepository.create({
			id: 'video-id',
			title: 'video',
			description: 'descricao do video',
			url: 'http://aaaa.com.br'
		})

		const { video } = await sut.handle({
			title: 'video'
		})

		expect(video).toEqual([expect.objectContaining({
			id: expect.any(String),
			description: 'descricao do video',
		})])
	})

	it('shouldn`t be able to find videos with wrong id', async () => {
		await videosRepository.create({
			id: 'video-id',
			title: 'video',
			description: 'descricao do video',
			url: 'http://aaaa.com.br'
		})

		expect(async () => {
			await sut.handle({
				title: 'wrong-title'
			})
		}).rejects.toBeInstanceOf(VideosNotFoundError)
	})
})