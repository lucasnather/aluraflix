import { app } from '@/app'
import request from 'supertest'

describe('Update Category [PUT]', () => {

	beforeEach(async () => {
		await app.ready()
	})

	afterAll(async () => {
		await app.close()
	})

	it('should be able to update a category by id', async () => {
		const category = await request(app.server)
			.post('/category')
			.send({
				title: 'LIVRE',
				color: 'green'
			})

		const { id } = category.body
		
		await request(app.server)
			.put(`/category/${id}`)
			.send({
				title: 'TERROR',
				color: 'gray'
			})
			.expect(203)
	})

	it('shouldn`t be able to update a category with wrong id', async () => {
		await request(app.server)
			.put('/category/100')
			.send({
				title: 'TERROR',
				color: 'gray'
			})
			.expect(404)
	})
})