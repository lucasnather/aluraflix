import { defineConfig } from 'vitest/config'
import tsConfigPath from 'vite-tsconfig-paths'

export default defineConfig({
	test: {
		globals: true,
		environmentMatchGlobs: [
			['src/controller/**', 'prisma']
		]
	},
	plugins: [tsConfigPath()]
})