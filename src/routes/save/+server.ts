import { json } from '@sveltejs/kit';
import type { Message } from 'ai/svelte';

export const POST = async ({ request }) => {
	// get the message from the request body
	const { message } = (await request.json()) as { message: Message };

	// log the message
	console.log(message);

	// TODO: save the message to the database

	// return httpstatus 200
	return json({}, { status: 200 });
};
