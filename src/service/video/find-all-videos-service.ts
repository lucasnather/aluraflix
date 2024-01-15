import { VideosNotFoundError } from '@/erros/videos-not-found-error'
import { IVideos } from '@/interface/i-videos'
import { Videos } from '@prisma/client'


interface FindAllVideosResponse {
    videos: Videos[]
}

export class FindAllVideosService {

	constructor(private videosRepository: IVideos) {}

	async handle(): Promise<FindAllVideosResponse> {
		const videos = await this.videosRepository.findAll()

		if(videos.length === 0) throw new VideosNotFoundError()

		return {
			videos
		}
	}

}