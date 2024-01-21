import { UsersRepository } from '@/repository/prisma/users-repository'
import { AuthenticateUserService } from '@/service/users/authenticate-users-service'

export function makeAuthenticateUser() {
	const usersRepository = new UsersRepository()
	const authenticateUserService = new AuthenticateUserService(usersRepository)

	return authenticateUserService
}