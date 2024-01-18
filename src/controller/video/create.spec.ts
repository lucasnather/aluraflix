import { app } from '@/app'
import request from 'supertest'

describe('Create Videos [POST]', () => {

	beforeEach(async () => {
		await app.ready()
	})

	afterAll(async () => {
		await app.close()
	})

	it('should be able to register a new video', async () => {
		await request(app.server)
			.post('/videos')
			.send({
				title: 'new title',
				description: 'new description',
				url: 'http://aaa.com.br',
				categories_id: 1
			})
			.expect(201)
	})

	it('shouldn`t be able to register a new video with validation error', async () => {
		await request(app.server)
			.post('/videos')
			.send({
				title: 'ne',
				description: 'new description',
				url: 'http://aaa.com.br'
			})
			.expect(401)
	})
})