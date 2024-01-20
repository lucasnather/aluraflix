import { Prisma, Users } from '@prisma/client'

export interface IUser {

    create(data: Prisma.UsersCreateManyInput): Promise<Users>
    findByEmail(email: string): Promise<Users | null>
}