import { prisma } from '@/database/connection/prisma'
import { IVideos } from '@/interface/i-videos'
import { Prisma } from '@prisma/client'

export class VideosRepository  implements IVideos {

	async create(data: Prisma.VideosUncheckedCreateInput) {
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

	async findById(id: string) {
		const video = await prisma.videos.findFirst({
			where: {
				id
			}
		})

		if(!video) return null

		return video
	}

	async updateById(data: Prisma.VideosUncheckedUpdateInput, id: string) {
		const video = await prisma.videos.update({
			where: {
				id
			},
			data
		})

		if(!video) return null

		return video
	}

	async deleteById(id: string) {
		await prisma.videos.delete({
			where: {
				id
			}
		})
	}

	async findAll() {
		const video = await prisma.videos.findMany()

		return video
	}

	async findByCategoryId(categoryId: number) {
		const video = await prisma.videos.findMany({
			where: {
				categories_id: categoryId
			}
		})

		if(!video) return null

		return video
	}

	async findByTitle(title: string) {
		const video = await prisma.videos.findMany({
			where: {
				title
			}
		})

		if(!video) return null

		return video
	}

    
}