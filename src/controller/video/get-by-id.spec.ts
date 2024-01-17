import { app } from '@/app'
import request from 'supertest'

describe('Get By Id Videos [GET]', () => {

	beforeAll(async () => {
		await app.ready()
	})

	afterAll(async () => {
		await app.close()
	})

	it('should be able to get videos by id', async () => {
		const videos = await request(app.server)
			.post('/videos')
			.send({
				title: 'new title',
				description: 'new description',
				url: 'http://uau.com.br'
			})

		const { id } = videos.body.videos

		console.log(id)

		await request(app.server)
			.get(`/videos/${id}`)
			.expect(200)
		
	})

	it('shouldn`t be able to get a video by correct ids', async () => {
		await request(app.server)
			.get('/videos/invalid-id')
			.expect(404)
	})

	

	
	
})