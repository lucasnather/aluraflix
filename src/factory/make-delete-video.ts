import { VideosRepository } from '@/repository/prisma/videos-repository'
import { DeleteByIdVideosService } from '@/service/video/delete-by-id-videos-service'

export function makeDeleteVideo() {
	const videosRepository = new VideosRepository()
	const deleteVideos = new DeleteByIdVideosService(videosRepository)

	return deleteVideos
}