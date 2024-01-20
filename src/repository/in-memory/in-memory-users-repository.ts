import { IUser } from '@/interface/i-users'
import { Prisma, Users } from '@prisma/client'
import { hash } from 'bcryptjs'
import { randomUUID } from 'node:crypto'

export class InMemoryUsersRepository implements IUser {

	private users: Users[] = []
    
	async create(data: Prisma.UsersCreateManyInput) {
		const users: Users = {
			id: data.id ?? randomUUID(),
			email: data.email,
			username: data.username,
			password: await hash(data.password, 6),
			createdAt: new Date()
		}

		this.users.push(users)

		return users
	}

	async findByEmail(email: string) {
		const users = this.users.find(user => user.email == email)

		if(!users) return null

		return users
	}
}