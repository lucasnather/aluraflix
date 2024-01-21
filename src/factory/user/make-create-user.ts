import { UsersRepository } from '@/repository/prisma/users-repository'
import { CreateUserService } from '@/service/users/create-users-service'

export function makeCreateUser() {
	const usersRepository = new UsersRepository()
	const createUserService = new CreateUserService(usersRepository)

	return createUserService
}