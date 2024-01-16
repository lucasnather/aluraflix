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

		return this.videos[indexVideo] = {
			title: data.title == undefined ? video.title : data.title,
			description: data.description == undefined ? video.description : data.description,
			url: data.url == undefined ? video.url : data.url,
			id: id,
			createdAt: video.createdAt
		}

	}

	async deleteById(id: string) {
		const videos = this.videos.findIndex(video => video.id === id)

		this.videos.splice(1, videos)
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

	private isURL(url: string) {
		// eslint-disable-next-line no-useless-escape
		const urlPattern: RegExp = /^(https?|ftp):\/\/([A-Za-z0-9.-]+)((\/[A-Za-z0-9\/_\-\.]*)*)$/

		if(!urlPattern.test(url)) {
			throw new Error('Enter a valid url')
		}

		return url
	}
    
}