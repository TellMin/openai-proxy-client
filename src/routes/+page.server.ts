import type { PageServerLoad } from './$types';
import { API, SECRET } from '$env/static/private';
import { sign } from 'jsonwebtoken';

export const load = (() => {
	const token = sign({}, SECRET, { expiresIn: '1d' });

	return {
		token,
		api: API
	};
}) satisfies PageServerLoad;
