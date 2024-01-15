import { VideosAlreadyExistsError } from '@/erros/video-already-exists'
import { IVideos } from '@/interface/i-videos'
import { Videos } from '@prisma/client'

interface CreateVideosRequest {
    title: string,
    description: string,
    url: string
}

interface CreateVideosResponse {
    videos: Videos
}

export class CreateVideosService {

	constructor(private videosRepository: IVideos) {}

	async handle(data: CreateVideosRequest): Promise<CreateVideosResponse> {
		const findVideosByUrl = await this.videosRepository.findByUrl(data.url)

		if(findVideosByUrl) throw new VideosAlreadyExistsError()

		const videos = await this.videosRepository.create(data)

		return {
			videos
		}
	}
}