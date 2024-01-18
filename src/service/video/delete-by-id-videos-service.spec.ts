import { VideosNotFoundError } from '@/erros/videos-not-found-error'
import { InMemoryVideosRepository } from '@/repository/in-memory/in-memory-videos-repository'
import { DeleteByIdVideosService } from './delete-by-id-videos-service'

let videosRepository: InMemoryVideosRepository
let sut: DeleteByIdVideosService

describe('Delete By id Videos Service', () => {

	beforeEach(() => {
		videosRepository = new InMemoryVideosRepository()
		sut = new DeleteByIdVideosService(videosRepository)
	})

	it('should be able to delete videos by id', async () => {
		await videosRepository.create({
			id: 'video-id',
			title: 'video',
			description: 'descricao do video',
			categories_id: 2,
			url: 'http://aaaa.com.br'
		})

		const video = await sut.handle({
			id: 'video-id'
		})

		console.log(video)

		expect(video).toBe(undefined)
	})

	it('shouldn`t be able to delete videos with wrong id', async () => {
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