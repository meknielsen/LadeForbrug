
// @ts-nocheck
process.env.NODE_NO_WARNINGS = 'stream/web';

import { loadData, refusion_db } from '$lib/db.js';
import { MongoClient, ObjectId } from 'mongodb';

// Should be taken from env
const uri = "mongodb+srv://dbuser:c9xVny1kebf8Qsgg@cluster0.h3vfwbk.mongodb.net/";
const client = new MongoClient(uri);
const database = client.db('homecharger');
const chargingData = database.collection('chargingData');
const refusionData = database.collection('refusionData');
const options = {projection: { _id: 1}  };
var objectID;

/** @type {import('./$types').PageServerLoad} */
export async function load({params}) {

	const years = JSON.parse(JSON.stringify(await chargingData.findOne({}, {projection: {_id:0}})));
	const refusion_data = await refusionData.findOne({}, {projection: {_id:0}});
	
	// objectID = years._id;

	console.log(params.oid)
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
	  let c_data = {};

	  // Check if file extention is .csv
	  if ( fileName.name.endsWith(".csv") ) {
		const filetext = await fileName.text();

		c_data = loadData(filetext);

		// console.log('testing in oid');

		// const result = await chargingData.updateOne({_id: new ObjectId('65f06e546d51a0cf0356c8b0')}, {$set: c_data})
		const result = await chargingData.insertOne(c_data)

		// console.log(c_data[2024])

		return {  };

	  } else {
		
		return { message: 'File extension must be .csv'}
	  }
	}
  };

  async function storeData(data) {


  }