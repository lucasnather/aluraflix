import { VideosRepository } from '@/repository/prisma/videos-repository'
import { FindVideosByCategoryIdVideosService } from '@/service/video/find-videos-by-category-id-service'

export function makeGetVideosByCategoryId() {
	const videosRepository = new VideosRepository()
	const findByCategoryIdVideos = new FindVideosByCategoryIdVideosService(videosRepository)

	return findByCategoryIdVideos
}