// @ts-nocheck

// @ts-nocheck

import { db, refusion_db } from '$lib/db.js';

/** @param {Parameters<import('./$types').PageServerLoad>[0]} event */
export async function load({}) {

	const years = await db.getData(`/`);
	const refusion_data = await refusion_db.getData(`/`);

	return {
		years,
		refusion_data
	};
}

// should not be needed since all the logic happens in subfolders