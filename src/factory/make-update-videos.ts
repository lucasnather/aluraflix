import { VideosRepository } from '@/repository/prisma/videos-repository'
import { UpdatedVideosByIdService } from '@/service/video/update-videos-by-id-service'

export function makeUpdateVideo() {
	const videosRepository = new VideosRepository()
	const updateVideos = new UpdatedVideosByIdService(videosRepository)

	return updateVideos
}