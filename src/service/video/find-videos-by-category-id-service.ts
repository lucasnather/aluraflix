import { VideosNotFoundError } from '@/erros/videos-not-found-error'
import { IVideos } from '@/interface/i-videos'
import { Videos } from '@prisma/client'

interface FindVideosByCategoryIdVideosRequest {
    categoryId: number
}

interface  FindVideosByCategoryIdVideosResponse {
    video: Videos[]
}

export class FindVideosByCategoryIdVideosService {

	constructor(private videosRepository: IVideos) {}

	async handle(data: FindVideosByCategoryIdVideosRequest): Promise<FindVideosByCategoryIdVideosResponse> {
		const video = await this.videosRepository.findByCategoryId(data.categoryId)

		if(!video) throw new VideosNotFoundError()

		return {
			video
		}
	}
}