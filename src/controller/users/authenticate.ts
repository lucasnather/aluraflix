import { InvalidCrendtialsError } from '@/erros/invalid-credentials-error'
import { makeAuthenticateUser } from '@/factory/user/make-authenticate-user'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
    
	const getBodySchema = z.object({
		email: z.string(),
		password: z.string()
	})

	const { email, password } = getBodySchema.parse(request.body)

	const createUserService = makeAuthenticateUser()

	try {
		const { users } = await createUserService.handle({
			email,
			password
		})

		const token = await reply.jwtSign({}, {
			expiresIn: '20m',
			sub: users.id
		}) 

		return reply.status(201).send({
			users,
			token
		})
	} catch(e) {
		if(e instanceof InvalidCrendtialsError) {
			return reply.status(404).send({
				message: e.message
			})
		}
	}
}