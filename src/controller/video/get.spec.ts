import { app } from '@/app'
import request from 'supertest'

describe('Get Videos [GET]', () => {

	beforeAll(async () => {

		await app.ready()
	})

	afterAll(async () => {
		await app.close()
	})

	it('shouldn`t be able to get a video', async () => {
		await request(app.server)
			.get('/videos')
			.expect(404)
	})

	it('should be able to get all videos', async () => {
		await request(app.server)
			.post('/category')
			.send({
				title: 'LIVRE',
				color: 'green'
			})
		
		await request(app.server)
			.post('/videos')
			.send({
				title: 'new title',
				description: 'new description',
				url: 'http://aaa.com.br',
				categories_id: 1
			})
		
		await request(app.server)
			.get('/videos')
			.expect(200)
	})

	it('should be able to get a specific video by search param', async () => {
		await request(app.server)
			.post('/videos')
			.send({
				title: 'title',
				description: 'descriptionnn',
				url: 'http://bbbb.com.br',
				categories_id: 1
			})
		
		await request(app.server)
			.get('/videos?title=title')
			.expect(200)
	})

	
	
})