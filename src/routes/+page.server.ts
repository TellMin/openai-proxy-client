import type { PageServerLoad } from './$types';
import { API, SECRET } from '$env/static/private';
import Jwt from 'jsonwebtoken';
import { supabase } from '$lib/server/supabaseClient';

export const load = (async () => {
	const token = Jwt.sign({}, SECRET, { expiresIn: '1d' });

	const { data } = await supabase.from('messages').select('*');

	return {
		token,
		api: API,
		messages: data
	};
}) satisfies PageServerLoad;
