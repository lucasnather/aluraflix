import { app } from '@/app'
import request from 'supertest'

describe('Find all Categories [GET]', () => {

	beforeEach(async () => {
		await app.ready()
	})

	afterAll(async () => {
		await app.close()
	})

	it('should be able to find categories by id', async () => {
		const category = await request(app.server)
			.post('/category')
			.send({
				title: 'LIVRE',
				color: 'green'
			})

		const { id } = category.body

		await request(app.server)
			.get(`/category/${id}`)
			.expect(200)
	})

	it('shouldn`t be able to find categories with invalid id', async () => {
		
		await request(app.server)
			.get('/category/100')
			.expect(404)
	})

})