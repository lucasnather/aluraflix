import { IVideos } from '@/interface/i-videos'
import { Prisma, Videos } from '@prisma/client'
import { randomUUID } from 'node:crypto'

export class InMemoryVideosRepository implements IVideos {

	private videos: Videos[] = []

	async create(data: Prisma.VideosUncheckedCreateInput){
		const videos: Videos = {
			id: data.id ?? randomUUID(),
			title: this.validateTitle(data.title),
			description: this.validateDescription(data.description),
			categories_id: data.categories_id ?? 1,
			url: this.isURL(data.url),
		
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

	async findById(id: string) {
		const videos = this.videos.find(video => video.id === id)

		if(!videos) return null

		return videos
	}

	async updateById(data: Prisma.VideosUncheckedUpdateInput, id: string) {
		const indexVideo = this.videos.findIndex(video => video.id === id)
		const video = this.videos.find(video => video.id === id)

		if(!video) return null

		this.videos[indexVideo] = {
			title: data.title == undefined ? video.title : this.validateTitle(data.title),
			description: data.description == undefined ? video.description : this.validateDescription(data.description),
			url: data.url == undefined ? video.url : this.isURL(data.url),
			categories_id: data.categories_id == undefined ? video.categories_id : data.categories_id,
			id: id,
			createdAt: video.createdAt
		}

		return this.videos[indexVideo]
	}

	async deleteById(id: string) {
		const videos = this.videos.findIndex(video => video.id === id)

		this.videos.splice(1, videos)
	}

	async findAll(page: number = 1) {
		return this.videos
	}
	
	async findByCategoryId(categoryId: number) {
		const video = this.videos.find(video => video.categories_id === categoryId)

		if(!video) return null

		return [video]
	}

	async findByTitle(title: string) {
		const video = this.videos.find(video => video.title === title)

		if(!video) return null

		return [video]
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

	private isURL(url: string) {
		// eslint-disable-next-line no-useless-escape
		const urlPattern: RegExp = /^(https?|ftp):\/\/([A-Za-z0-9.-]+)((\/[A-Za-z0-9\/_\-\.]*)*)$/

		if(!urlPattern.test(url)) {
			throw new Error('Enter a valid url')
		}

		return url
	}
    
}