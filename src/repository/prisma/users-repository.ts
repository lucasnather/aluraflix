import { prisma } from '@/database/connection/prisma'
import { IUser } from '@/interface/i-users'
import { Prisma } from '@prisma/client'

export class UsersRepository implements IUser {
    
	async create(data: Prisma.UsersCreateManyInput) {
		const user = await prisma.users.create({
			data
		})

		return user
	}

	async findByEmail(email: string) {
		const user = await prisma.users.findFirst({
			where: {
				email
			}
		})

		if(!user) return null

		return user
	}
    
}