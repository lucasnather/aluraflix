import { VideosNotFoundError } from '@/erros/videos-not-found-error'
import { IVideos } from '@/interface/i-videos'
import { Videos } from '@prisma/client'


interface FindAllVideosRequest{
    page?: number
}

interface FindAllVideosResponse {
    videos: Videos[]
}

export class FindAllVideosService {

	constructor(private videosRepository: IVideos) {}

	async handle(data: FindAllVideosRequest): Promise<FindAllVideosResponse> {
		if(!data.page) data.page = 1

		const videos = await this.videosRepository.findAll(data.page)

		if(videos.length === 0) throw new VideosNotFoundError()

		return {
			videos
		}
	}

}