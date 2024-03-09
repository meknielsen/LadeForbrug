
// @ts-nocheck
process.env.NODE_NO_WARNINGS = 'stream/web';

import { db, loadData, refusion_db } from '$lib/db.js';
import { fail, writeFile, FileReader } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({}) {

	const years = await db.getData(`/`);
	const refusion_data = await refusion_db.getData(`/`);

	return {
		years,
		refusion_data
	};
}

export const actions = {
	default: async ({ request }) => {
	  const formData = await request.formData();
	  const fileName = formData.get('file');

	  // Check if file extention is .csv
	  if ( fileName.name.endsWith(".csv") ) {
		const filetext = await fileName.text();

		loadData(filetext);

		return { success: true };

	  } else {
		
		return { message: 'File extension must be .csv'}
	  }
	}
  };