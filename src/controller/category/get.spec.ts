import { app } from '@/app'
import request from 'supertest'

describe('Find all Categories [GET]', () => {

	beforeEach(async () => {
		await app.ready()
	})

	afterAll(async () => {
		await app.close()
	})

	it('shouldn`t be able to find a all categories with list empty', async () => {
		await request(app.server)
			.get('/category')
			.expect(404)
	})

	it('should be able to find all categories', async () => {
		await request(app.server)
			.post('/category')
			.send({
				title: 'LIVRE',
				color: 'green'
			})

		await request(app.server)
			.post('/category')
			.send({
				title: 'TERROR',
				color: 'gray'
			})
		
		await request(app.server)
			.get('/category')
			.expect(200)
	})

})