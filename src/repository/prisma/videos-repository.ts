import { prisma } from '@/database/connection/prisma'
import { IVideos } from '@/interface/i-videos'
import { Prisma } from '@prisma/client'

export class VideosRepository  implements IVideos {

	async create(data: Prisma.VideosCreateInput) {
		const video = await prisma.videos.create({
			data
		})

		return video
	}

	async findByUrl(url: string){
		const video = await prisma.videos.findUnique({
			where: {
				url
			}
		})

		if(!video) return null

		return video
	}
    
}