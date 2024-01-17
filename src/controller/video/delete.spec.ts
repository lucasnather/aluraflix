import { app } from '@/app'
import request from 'supertest'

describe('Delete By Id Videos [DELETE]', () => {

	beforeAll(async () => {
		await app.ready()
	})

	afterAll(async () => {
		await app.close()
	})

	it('should be able to delete videos by id', async () => {
		const videos = await request(app.server)
			.post('/videos')
			.send({
				title: 'new title',
				description: 'new description',
				url: 'http://uau.com.br'
			})

		const { id } = videos.body.videos

		await request(app.server)
			.delete(`/videos/${id}`)
			.expect(203)
		
	})

	it('shouldn`t be able to delete a video by invalid ids', async () => {
		await request(app.server)
			.get('/videos/invalid-id')
			.expect(404)
	})

	

	
	
})