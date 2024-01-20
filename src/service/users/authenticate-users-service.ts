import { InvalidCrendtialsError } from '@/erros/invalid-credentials-error'
import { IUser } from '@/interface/i-users'
import { PasswordHash } from '@/utils/password-hash'
import { Users } from '@prisma/client'

interface AuthenticateserRequest {
    email: string
    password: string
}

interface AuthenticateserResponse {
    users: Users
}

export class AuthenticateserService {

	constructor(private usersRepository: IUser) {}

	async handle(data: AuthenticateserRequest): Promise<AuthenticateserResponse> {
		const users = await this.usersRepository.findByEmailAndPassword(data.email, data.password)

		if(!users) throw new InvalidCrendtialsError()

		const passwordHash = new PasswordHash()


		const doesPasswordExists = await passwordHash.comparaHash(data.password, users.password)

		if(!doesPasswordExists) throw new InvalidCrendtialsError()

		return {
			users
		}
	}
}