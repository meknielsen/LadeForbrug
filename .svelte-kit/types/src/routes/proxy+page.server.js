// @ts-nocheck

// @ts-nocheck
process.env.NODE_NO_WARNINGS = 'stream/web';

import { db, loadData, refusion_db } from '$lib/db.js';
import { MongoClient } from 'mongodb';

// Should be taken from env
const uri = "mongodb+srv://dbuser:c9xVny1kebf8Qsgg@cluster0.h3vfwbk.mongodb.net/";
const client = new MongoClient(uri);
const database = client.db('homecharger');
const chargingData = database.collection('chargingData');
const refusionData = database.collection('refusionData');//new

/** @param {Parameters<import('./$types').PageServerLoad>[0]} event */
export async function load({}) {

	const years = await chargingData.findOne({}, {projection: {_id: 0}}); // NO INTERNET
	// const years = await db.getData(`/`);
	// const refusion_data = await refusion_db.getData(`/`);
	const refusion_data = await refusionData. findOne({}, {projection: {_id:0}}); // NO INTERNET

	// Ensures that the client will close when you finish/error
	await client.close(); // NO INTERNET

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