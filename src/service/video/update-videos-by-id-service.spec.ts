import { VideosNotFoundError } from '@/erros/videos-not-found-error'
import { InMemoryVideosRepository } from '@/repository/in-memory/in-memory-videos-repository'
import { UpdatedVideosByIdService } from './update-videos-by-id-service'

let videosRepository: InMemoryVideosRepository
let sut: UpdatedVideosByIdService

describe('Update By id Videos Service', () => {

	beforeEach(() => {
		videosRepository = new InMemoryVideosRepository()
		sut = new UpdatedVideosByIdService(videosRepository)
	})

	it('should be able to update videos by id', async () => {
		await videosRepository.create({
			id: 'video-id',
			title: 'video',
			description: 'descricao do video',
			url: 'http://aaaa.com.br'
		})

		const { videos } = await sut.handle({
			id: 'video-id',
			title: 'video novo',
			description: 'nova descricao',
			url: 'http://nova.com.br'
		})

		expect(videos).toEqual(expect.objectContaining({
			id: 'video-id',
			title: 'video novo'
		}))
	})

	it('should be able to update videos by id with some arguments', async () => {
		await videosRepository.create({
			id: 'video-id',
			title: 'video',
			description: 'descricao do video',
			url: 'http://aaaa.com.br'
		})

		const { videos } = await sut.handle({
			id: 'video-id',
			description: 'nova descricao',
		})

		expect(videos).toEqual(expect.objectContaining({
			id: 'video-id',
			description: 'nova descricao',
			url: 'http://aaaa.com.br'
		}))
	})

	it('shouldn`t be able to update videos by id with invalid arguments', async () => {
		await videosRepository.create({
			id: 'video-id',
			title: 'video',
			description: 'descricao do video',
			url: 'http://aaaa.com.br'
		})

		expect(async () => {
			await sut.handle({
				id: 'video-id',
				description: 'short',
			})
		}).rejects.toBeInstanceOf(Error)
	})

	it('shouldn`t be able to update videos with wrong id', async () => {
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