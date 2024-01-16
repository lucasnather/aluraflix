import { randomUUID } from 'node:crypto'
import 'dotenv/config'
import type { Environment } from 'vitest'
import { execSync } from 'node:child_process'
import { prisma } from '@/database/connection/prisma'

function generateUrlSchema(schema: string) {

	if(!process.env.DATABASE_URL) throw new Error('Database not exist!!!')

	const url = new URL(process.env.DATABASE_URL)

	url.searchParams.set('schema', schema)

	return url.toString()
}

export default <Environment>{
	name: 'prisma',
	transformMode: 'ssr',
	
	async setup() {
		const schema = randomUUID()
		const databaseUrl = generateUrlSchema(schema)

		process.env.DATABASE_URL = databaseUrl

		execSync('npx prisma migrate deploy')


		return {
			async teardown() {
				await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schema} CASCADE"`)

				await prisma.$disconnect()
			}
		}
	}
}