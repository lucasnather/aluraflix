import { app } from '@/app'
import request from 'supertest'

describe('Update Videos [PUT]', () => {

	beforeEach(async () => {
		await app.ready()
	})

	afterAll(async () => {
		await app.close()
	})

	it('should be able to update a video by id', async () => {
		const video = await request(app.server)
			.post('/videos')
			.send({
				title: 'new title',
				description: 'new description',
				url: 'http://aaa.com.br'
			})

		const { id } = video.body.videos
          
		await request(app.server)
			.put(`/videos/${id}`)
			.send({
				title: 'other title'
			})
			.expect(201)
	
	})

	it('shouldn`t be able to update a video with invalid id', async () => {
		await request(app.server)
			.put('/videos/wrong-id')
			.send({
				title: 'ne',
				description: 'new description',
				url: 'ht://aaa.com.br'
			})
			.expect(401)
	})
})