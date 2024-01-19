import { CategoriesRepository } from '@/repository/prisma/categories-repository'
import { VideosRepository } from '@/repository/prisma/videos-repository'
import { CreateVideosService } from '@/service/video/create-videos-service'

export function makeCreateVideo() {
	const videosRepository = new VideosRepository()
	const categoryRepository = new CategoriesRepository()
	const createVideos = new CreateVideosService(videosRepository, categoryRepository)

	return createVideos
}