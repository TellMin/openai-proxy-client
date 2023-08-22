import type { PageServerLoad } from './$types';
import { API, SECRET } from '$env/static/private';
import Jwt from 'jsonwebtoken';

export const load = (() => {
	const token = Jwt.sign({}, SECRET, { expiresIn: '1d' });

	return {
		token,
		api: API
	};
}) satisfies PageServerLoad;
