import { app } from '@/app'
import request from 'supertest'

describe('Create Users [POST]', () => {

	beforeEach(async () => {
		await app.ready()
	})

	afterAll(async () => {
		await app.close()
	})

	it('should be able to register a new user', async () => {
		await request(app.server)
			.post('/user')
			.send({
				username: 'lnather',
				email: 'l@gmail.com',
				password: '12345678'
			})
			.expect(201)
	})

})