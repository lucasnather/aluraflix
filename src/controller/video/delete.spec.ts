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
				categories_id: 1
			})

		const { id } = videos.body

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