import 'dotenv/config'
import { z } from 'zod'


const EnvSchema = z.object({
	PORT: z.coerce.number().default(3000),
	NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
	SECRET: z.string()
})

const _env = EnvSchema.safeParse(process.env)

if(!_env.success) {
	console.error('Environment Variable Error', _env.error.format())

	throw new Error('Environment Variable Error')
}

export const env = _env.data