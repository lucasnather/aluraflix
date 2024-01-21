import { app } from '@/app'
import request from 'supertest'

describe('Authenticate Users [POST]', () => {

	beforeEach(async () => {
		await app.ready()
	})

	afterAll(async () => {
		await app.close()
	})

	it('should be able to authenticate a new user', async () => {
		await request(app.server)
			.post('/user')
			.send({
				username: 'lnather',
				email: 'l@gmail.com',
				password: '12345678'
			})

		await request(app.server)
			.post('/user/login')
			.send({
				email: 'l@gmail.com',
				password: '12345678'
				
			})
			.expect(201)
	})

	it('shouldn`t be able to authenticate a new user with invalid credentials', async () => {
		await request(app.server)
			.post('/user')
			.send({
				username: 'lnather',
				email: 'l@gmail.com',
				password: '12345678'
			})

		await request(app.server)
			.post('/user/login')
			.send({
				email: 'wrong email',
				password: 'wrong password'
				
			})
			.expect(404)
	})
})