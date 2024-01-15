import { VideosNotFoundError } from '@/erros/videos-not-found-error'
import { IVideos } from '@/interface/i-videos'
import { Videos } from '@prisma/client'

interface FindByIdVideosRequest {
    id: string
}

interface  FindByIdVideosResponse {
    video: Videos
}

export class FindByIdVideosService {

	constructor(private videosRepository: IVideos) {}

	async handle(data: FindByIdVideosRequest): Promise<FindByIdVideosResponse> {
		const video = await this.videosRepository.findById(data.id)

		if(!video) throw new VideosNotFoundError()

		return {
			video
		}
	}
}