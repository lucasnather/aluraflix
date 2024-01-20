import { Prisma, Users } from '@prisma/client'

export interface IUser {

    create(data: Prisma.UsersCreateManyInput): Promise<Users>
    findByEmailAndPassword(email: string, password: string): Promise<Users | null>
}