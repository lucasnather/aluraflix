import { VideosRepository } from '@/repository/prisma/videos-repository'
import { FindVideosByTitleService } from '@/service/video/find-videos-by-title-service'

export function makeGetVideosByTitle() {
	const videosRepository = new VideosRepository()
	const findByTitleVideos = new FindVideosByTitleService(videosRepository)

	return findByTitleVideos
}