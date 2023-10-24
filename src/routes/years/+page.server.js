
// @ts-nocheck

import { db } from '$lib/db.js';

export async function load({}) {

	const years = await db.getData(`/`);

	return {
		years
	};
}