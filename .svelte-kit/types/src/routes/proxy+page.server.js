// @ts-nocheck

// @ts-nocheck

import { db } from '$lib/db.js';

/** @param {Parameters<import('./$types').PageServerLoad>[0]} event */
export async function load({}) {

	const years = await db.getData(`/`);

	return {
		years
	};
}

// should not be needed since all the logic happens in subfolders