import { json } from '@sveltejs/kit';
import type { Message } from 'ai/svelte';
import { supabase } from '$lib/server/supabaseClient';

export const POST = async ({ request }) => {
	// get the message from the request body
	const { message } = (await request.json()) as { message: Message };

	// insert message into messages table
	const { error } = await supabase
		.from('messages')
		.insert({ content: message.content, role: message.role });

	if (error) {
		return json({}, { status: 500 });
	}

	// return httpstatus 200
	return json({}, { status: 200 });
};
