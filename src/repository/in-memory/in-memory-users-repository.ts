import { IUser } from '@/interface/i-users'
import { Prisma, Users } from '@prisma/client'
import { randomUUID } from 'node:crypto'

export class InMemoryUsersRepository implements IUser {

	private users: Users[] = []
    
	async create(data: Prisma.UsersCreateManyInput) {
		const users: Users = {
			id: data.id ?? randomUUID(),
			email: data.email,
			username: data.username,
			password: data.password,
			createdAt: new Date()
		}

		this.users.push(users)

		return users
	}

	async findByEmailAndPassword(email: string, password: string) {
		const users = this.users.find(user => {
			user.email === email && user.password === password
		})

		if(!users) return null

		return users
	}
}