import { compare, hash } from 'bcryptjs'

export class PasswordHash {

	async createHash(password: string) {
		const saltRounds = 6
		return await hash(password, saltRounds)
	}

	async comparaHash(password: string, DBpassword: string) {
		return await compare(password, DBpassword)
	}
}