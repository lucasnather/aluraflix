import { VideosNotFoundError } from '@/erros/videos-not-found-error'
import { IVideos } from '@/interface/i-videos'
import { Videos } from '@prisma/client'

interface UpdatedVideosByIdRequest {
    title?: string
    description?: string
    url?: string,
    id: string
}

interface UpdatedVideosByIdResponse {
    videos: Videos
}

export class UpdatedVideosByIdService {

	constructor(private videosRepository: IVideos) {}

	async handle(data: UpdatedVideosByIdRequest): Promise<UpdatedVideosByIdResponse> {
		const videos = await this.videosRepository.updateById(data, data.id)

		if(!videos) throw new VideosNotFoundError()

		return {
			videos
		}
	}
}