import { app } from '@/app'
import request from 'supertest'

describe('Create Category [POST]', () => {

	beforeEach(async () => {
		await app.ready()
	})

	afterAll(async () => {
		await app.close()
	})

	it('should be able to register a new category', async () => {
		await request(app.server)
			.post('/category')
			.send({
				title: 'LIVRE',
				color: 'green'
			})
			.expect(201)
	})

	it('shouldn`t be able to register a new category with validation error', async () => {
		await request(app.server)
			.post('/videos')
			.send({
				title: '',
				color: '',
			})
			.expect(401)
	})
})