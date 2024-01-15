import { IVideos } from '@/interface/i-videos'
import { Prisma, Videos } from '@prisma/client'
import { randomUUID } from 'node:crypto'

export class InMemoryVideosRepository implements IVideos {

	private videos: Videos[] = []

	async create(data: Prisma.VideosCreateInput){
		const videos: Videos = {
			id: data.id ?? randomUUID(),
			title: this.validateTitle(data.title),
			description: this.validateDescription(data.description),
			url: data.url,
			createdAt: new Date()
		}

		this.videos.push(videos)

		return videos
	}

	async findByUrl(url: string) {
		const videos = this.videos.find(video => video.url === url)

		if(!videos) return null

		return videos
	}

	async findAll() {
		return this.videos
	}

	private validateTitle(title: string) {
		if(title.length < 3) {
			throw new Error('The title must have 3 caracteres or more')
		}

		return title
	}

	private validateDescription(description: string) {
		if(description.length < 10) {
			throw new Error('The title must have 10 caracteres or more')
		}

		return description
	}
    
}