import { CategoryNotFoundError } from '@/erros/category-not-found-error'
import { VideosAlreadyExistsError } from '@/erros/video-already-exists-error'
import { ICategories } from '@/interface/i-categories'
import { IVideos } from '@/interface/i-videos'
import { Videos } from '@prisma/client'

interface CreateVideosRequest {
    title: string,
    description: string,
    url: string,
	categories_id?: number
}

interface CreateVideosResponse {
    videos: Videos
}

export class CreateVideosService {

	constructor(
		private videosRepository: IVideos,
		private categoryRepository: ICategories
	) {}

	async handle(data: CreateVideosRequest): Promise<CreateVideosResponse> {
		if(data.categories_id) {
			const findCategory = await this.categoryRepository.findById(data.categories_id)

			if(!findCategory) throw new CategoryNotFoundError()
		}

		const findVideosByUrl = await this.videosRepository.findByUrl(data.url)

		if(findVideosByUrl) throw new VideosAlreadyExistsError()

		const videos = await this.videosRepository.create(data)

		return {
			videos
		}
	}
}