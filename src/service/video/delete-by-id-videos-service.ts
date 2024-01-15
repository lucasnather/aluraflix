import { VideosNotFoundError } from '@/erros/videos-not-found-error'
import { IVideos } from '@/interface/i-videos'

interface DeleteByIdVideosRequest {
    id: string
}

export class DeleteByIdVideosService {

	constructor(private videosRepository: IVideos) {}

	async handle(data: DeleteByIdVideosRequest) {
		const video = await this.videosRepository.findById(data.id)

		if(!video) throw new VideosNotFoundError()

		await this.videosRepository.deleteById(data.id)

	}
}