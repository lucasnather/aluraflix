import { makeCreateUser } from '@/factory/user/make-create-user'
import { PasswordHash } from '@/utils/password-hash'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
    
	const getBodySchema = z.object({
		username: z.string(),
		email: z.string(),
		password: z.string()
	})

	const { username, email, password } = getBodySchema.parse(request.body)

	const passwordHash = new PasswordHash()
	const hash = await passwordHash.createHash(password)

	const createUserService = makeCreateUser()

	try {
		const { users } = await createUserService.handle({
			username,
			email,
			password: hash
		})

		return reply.status(201).send(users)
	} catch(e) {
		return reply.status(404).send({
			message: 'Error internal'
		})
	}
}