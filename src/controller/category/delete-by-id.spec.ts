import { app } from '@/app'
import request from 'supertest'

describe('Delete by id Categories [DELETE]', () => {

	beforeAll(async () => {
		await app.ready()
	})

	afterAll(async () => {
		await app.close()
	})

	it('should be able to delete categories by id', async () => {
		const category = await request(app.server)
			.post('/category')
			.send({
				title: 'LIVRE',
				color: 'green'
			})

            
		const { id } = category.body

		await request(app.server)
			.delete(`/category/${id}`)
			.expect(203)
            
	})

	it('shouldn`t be able to delete categories with wrong id', async () => {
		await request(app.server)
			.delete('/category/100')
			.expect(404)
	})

})