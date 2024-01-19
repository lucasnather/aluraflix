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
		await request(app.server)
			.post('/category')
			.send({
				title: 'LIVRE',
				color: 'green'
			})

		const videos = await request(app.server)
			.post('/videos')
			.send({
				title: 'new title',
				description: 'new description',
				url: 'http://uau.com.br',
			})

		const { id } = videos.body

		await request(app.server)
			.get(`/videos/${id}`)
			.expect(200)
		
	})

	it('shouldn`t be able to get a video by invalid id', async () => {
		await request(app.server)
			.get('/videos/invalid-id')
			.expect(404)
	})

	

	
	
})