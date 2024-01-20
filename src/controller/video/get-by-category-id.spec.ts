import { app } from '@/app'
import request from 'supertest'

describe('Get By Category Id Videos [GET]', () => {

	beforeAll(async () => {
		await app.ready()
	})

	afterAll(async () => {
		await app.close()
	})

	it('should be able to get videos by category id', async () => {
		const videos = await request(app.server)
			.post('/category')
			.send({
				title: 'LIVRE',
				color: 'green'
			})

		const { categoryId } = videos.body

		await request(app.server)
			.get(`/videos/category/${categoryId}`)
		

	})

	it('shouldn`t be able to get a video by invalid category id', async () => {
		await request(app.server)
			.get('/videos/100')
			.expect(404)
	})

	

	
	
})