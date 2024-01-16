import { VideosRepository } from '@/repository/prisma/videos-repository'
import { FindAllVideosService } from '@/service/video/find-all-videos-service'

export function makeGetVideos() {
	const videosRepository = new VideosRepository()
	const findAllVideos = new FindAllVideosService(videosRepository)

	return findAllVideos
}