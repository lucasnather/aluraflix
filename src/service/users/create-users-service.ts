import { IUser } from '@/interface/i-users'
import { Users } from '@prisma/client'

interface CreateUserRequest {
    username: string
    email: string
    password: string
}

interface CreateUserResponse {
    users: Users
}

export class CreateUserService {

	constructor(private usersRepository: IUser) {}

	async handle(data: CreateUserRequest): Promise<CreateUserResponse> {
		const users = await this.usersRepository.create(data)

		return {
			users
		}
	}
}