
// @ts-nocheck

import { db } from '$lib/db.js';

/** @type {import('./$types').PageServerLoad} */
export async function load({}) {

	const years = await db.getData(`/`);

	return {
		years
	};
}

// should not be needed since all the logic happens in subfolders