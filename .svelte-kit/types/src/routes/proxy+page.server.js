// @ts-nocheck

// @ts-nocheck
process.env.NODE_NO_WARNINGS = 'stream/web';

import { loadData, refusion_db } from '$lib/db.js';
import { CONNREFUSED } from 'dns';
import { MongoClient, ObjectId } from 'mongodb';

// Should be taken from env
const uri = "mongodb+srv://dbuser:c9xVny1kebf8Qsgg@cluster0.h3vfwbk.mongodb.net/";
const client = new MongoClient(uri);
const database = client.db('homecharger');
const chargingData = database.collection('chargingData');
const refusionData = database.collection('refusionData');
const options = {projection: { _id: 1}  };
// var objectID;

/** @param {Parameters<import('./$types').PageServerLoad>[0]} event */
export async function load({}) {

	let years_data = JSON.parse(JSON.stringify(await chargingData.findOne()));
	const objectID = years_data._id;
	const { _id, ...rest } = years_data;
	const years = rest;

	const refusion_data = await refusionData.findOne({}, {projection: {_id:0}});

	// Ensures that the client will close when you finish/error
	// await client.close(); // Do not close here ... it will disrupt when loading file data

	return {
		years,
		refusion_data, 
		objectID
	};
}

export const actions = {
	default: async ({ request }) => {
	  const formData = await request.formData();
	  const fileName = formData.get('file');
	  let n_data = {};

	  // Check if file extention is .csv
	  if ( fileName.name.endsWith(".csv") ) {
		const filetext = await fileName.text();

		n_data = loadData(filetext);

		let c_data = JSON.parse(JSON.stringify(await chargingData.findOne({}, {projection: {_id:0}})));

		function merge(c, n) {
			for ( let i = 0; i < Object.keys(n).length; i++ ) {
				if ( c.hasOwnProperty(Object.keys(n)[i])) {				
					c[Object.keys(n)[i]] = {...c[Object.keys(n)[i]], ...n[Object.keys(n)[i]]}
				}
			}
			return c;
		}
		
		c_data = merge(c_data, n_data);

		const result = await chargingData.updateOne({_id: new ObjectId('66e8546314ec1c4939f7bdda')}, {$set: c_data})

		return {  };

	  } else {
		
		return { message: 'File extension must be .csv'}
	  }
	}
}
  
  async function storeData(data) {


  }