import { InvalidCrendtialsError } from '@/erros/invalid-credentials-error'
import { InMemoryUsersRepository } from '@/repository/in-memory/in-memory-users-repository'
import { AuthenticateUserService } from './authenticate-users-service'

let usersRepository: InMemoryUsersRepository
let sut: AuthenticateUserService

describe('Authenticate Users Service', () => {

	beforeEach(() => {
		usersRepository = new InMemoryUsersRepository()
		sut = new AuthenticateUserService(usersRepository)
	})

	it('should be able to authenticate  user', async () => {
		await usersRepository.create({
			email: 'l@gmail.com',
			username: 'lnather',
			password: '12345678'
		})

		const { users } = await sut.handle({
			email: 'l@gmail.com',
			password: '12345678'
		})

		expect(users).toEqual(expect.objectContaining({
			id: expect.any(String),
			username: 'lnather',
		}))

	})

	it('shouldn`t be able to authenticate user with wrong password', async () => {
		await usersRepository.create({
			email: 'l@gmail.com',
			username: 'lnather',
			password: '12345678'
		})

		expect(async () => {
			await sut.handle({
				email: 'l@gmail.com',
				password: '123'
			})
		}).rejects.toBeInstanceOf(InvalidCrendtialsError)

	})

	it('shouldn`t be able to authenticate user with wrong email', async () => {
		await usersRepository.create({
			email: 'l@gmail.com',
			username: 'lnather',
			password: '12345678'
		})

		expect(async () => {
			await sut.handle({
				email: 'wrong',
				password: '12345678'
			})
		}).rejects.toBeInstanceOf(InvalidCrendtialsError)

	})
})