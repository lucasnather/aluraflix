import { VideosNotFoundError } from '@/erros/videos-not-found-error'
import { InMemoryVideosRepository } from '@/repository/in-memory/in-memory-videos-repository'
import { FindByIdVideosService } from './find-by-id-videos-service'

let videosRepository: InMemoryVideosRepository
let sut: FindByIdVideosService

describe('Find By id Videos Service', () => {

	beforeEach(() => {
		videosRepository = new InMemoryVideosRepository()
		sut = new FindByIdVideosService(videosRepository)
	})

	it('should be able to find videos by id', async () => {
		await videosRepository.create({
			id: 'video-id',
			title: 'video',
			description: 'descricao do video',
			url: 'http://aaaa.com.br'
		})

		const { video } = await sut.handle({
			id: 'video-id'
		})

		expect(video).toEqual(expect.objectContaining({
			id: expect.any(String),
			description: 'descricao do video',
		}))
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
				id: 'wrong-id'
			})
		}).rejects.toBeInstanceOf(VideosNotFoundError)
	})
})