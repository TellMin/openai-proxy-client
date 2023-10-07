import type { Message } from 'ai';

export const saveResponseMessage = async (responseMessage: Message) => {
	const response = await fetch('/save', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			message: responseMessage
		})
	});
	if (!response.ok) {
		console.error('Error saving response message');
	}
};
