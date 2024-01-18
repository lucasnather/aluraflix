import { VideosNotFoundError } from '@/erros/videos-not-found-error'
import { IVideos } from '@/interface/i-videos'
import { Videos } from '@prisma/client'

interface FindVideosByTitleRequest {
    title: string
}

interface FindVideosByTitleResponse {
    video: Videos[]
}

export class FindVideosByTitleService {

	constructor(private videosRepository: IVideos) {}

	async handle(data:FindVideosByTitleRequest): Promise<FindVideosByTitleResponse> {
		const video = await this.videosRepository.findByTitle(data.title)

		if(!video) throw new VideosNotFoundError()

		return {
			video
		}
	}
}