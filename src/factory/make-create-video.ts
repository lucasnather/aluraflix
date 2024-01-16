import { VideosRepository } from '@/repository/prisma/videos-repository'
import { CreateVideosService } from '@/service/video/create-videos-service'

export function makeCreateVideo() {
	const videosRepository = new VideosRepository()
	const createVideos = new CreateVideosService(videosRepository)

	return createVideos
}