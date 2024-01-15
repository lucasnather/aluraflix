import { app } from './app'

app.listen({
	port: 3000
}).then(() => {
	console.log('Server running')
}).catch(e => {
	console.error('Error server Running', e)
})