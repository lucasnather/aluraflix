import { InMemoryUsersRepository } from '@/repository/in-memory/in-memory-users-repository'
import { CreateUserService } from './create-users-service'

let usersRepository: InMemoryUsersRepository
let sut: CreateUserService

describe('Create Users Service', () => {

	beforeEach(() => {
		usersRepository = new InMemoryUsersRepository()
		sut = new CreateUserService(usersRepository)
	})

	it('should be able to create a new user', async () => {
		const { users } = await sut.handle({
			email: 'l@gmail.com',
			username: 'lnather',
			password: '12345678'
		})

		expect(users).toEqual(expect.objectContaining({
			id: expect.any(String),
			username: 'lnather',
		}))

	})
})