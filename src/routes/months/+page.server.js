
// @ts-nocheck

import { db } from '$lib/db.js';

export async function load({ fetch }) {

	const years = await db.getData(`/`);

	return {
		years
	};
}