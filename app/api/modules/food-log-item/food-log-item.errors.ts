export class BadAudioInputError extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'BadAudioInputError';
	}
}
