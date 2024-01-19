import { VideosRepository } from '@/repository/prisma/videos-repository'
import { FindByIdVideosService } from '@/service/video/find-by-id-videos-service'

export function makeGetVideosByID() {
	const videosRepository = new VideosRepository()
	const findByIdVideos = new FindByIdVideosService(videosRepository)

	return findByIdVideos
}