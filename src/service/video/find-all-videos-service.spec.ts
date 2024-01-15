import { VideosNotFoundError } from '@/erros/videos-not-found-error'
import { InMemoryVideosRepository } from '@/repository/in-memory/in-memory-videos-repository'
import { FindAllVideosService } from './find-all-videos-service'

let videosRepository: InMemoryVideosRepository
let sut: FindAllVideosService

describe('Find all Videos Service', () => {

	beforeEach(() => {
		videosRepository = new InMemoryVideosRepository()
		sut = new FindAllVideosService(videosRepository)
	})

	it('should be able to find all videos', async () => {
		await videosRepository.create({
			title: 'video',
			description: 'descricao do video',
			url: 'http://aaaa.com.br'
		})

		const { videos } = await sut.handle()

		expect(videos).toHaveLength(1)
		expect(videos).toEqual([expect.objectContaining({
			id: expect.any(String)
		})])
	})

	it('should be able to throw a error when dont exist videos on database', async () => {
		
		expect(async () => {
			await sut.handle()
		}).rejects.toBeInstanceOf(VideosNotFoundError)
	})
})