export class VideosAlreadyExistsError extends Error {
	constructor() {
		super('Video already exists Error')
	}
}