import { InvalidCrendtialsError } from '@/erros/invalid-credentials-error'
import { IUser } from '@/interface/i-users'
import { PasswordHash } from '@/utils/password-hash'
import { Users } from '@prisma/client'

interface AuthenticateUserRequest {
    email: string
    password: string
}

interface AuthenticateUserResponse {
    users: Users
}

export class AuthenticateUserService {

	constructor(private usersRepository: IUser) {}

	async handle(data: AuthenticateUserRequest): Promise<AuthenticateUserResponse> {
		const users = await this.usersRepository.findByEmail(data.email)

		if(!users) throw new InvalidCrendtialsError()

		const passwordHash = new PasswordHash()

		const doesPasswordExists = await passwordHash.comparaHash(data.password, users.password)

		if(!doesPasswordExists) throw new InvalidCrendtialsError()

		return {
			users
		}
	}
}