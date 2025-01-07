
// @ts-nocheck
process.env.NODE_NO_WARNINGS = 'stream/web';

import { loadData, refusion_db } from '$lib/db.js';
import { CONNREFUSED } from 'dns';
import { MongoClient, ObjectId } from 'mongodb';
import {_user} from '$lib/stores.js';

// Should be taken from env
const uri = "mongodb+srv://dbuser:c9xVny1kebf8Qsgg@cluster0.h3vfwbk.mongodb.net/";
const client = new MongoClient(uri);
const database = client.db('homecharger');
const chargingData = database.collection('chargingData');
const refusionData = database.collection('refusionData');
const userData = database.collection('userData');
const options = {projection: { _id: 1}  };
// var objectID;

/** @type {import('./$types').PageServerLoad} */
/**
 * Asynchronously loads charging and refusion data from the database.
 * 
 * This function retrieves the first document from the chargingData collection,
 * extracts its years data and object ID, and fetches refusion data from the
 * refusionData collection.
 *
 * @param {Object} params - The parameters object (empty in this case).
 * @returns {Promise<Object>} An object containing:
 *   - years: An object with the years data (excluding the _id field).
 *   - refusion_data: The refusion data object (excluding the _id field).
 *   - objectID: The MongoDB ObjectId of the charging data document.
 */
export async function load({}) {

    let years_data = {};
    let user_data = {};
    let refusion_data = {};
    let objectID;
    let years = {};

    let loggedIn = true;

    // const user_email = 'mek.nielsen@gmail.com';
    
    // if (params.oid.length === 24) {
        // years_data = JSON.parse(JSON.stringify(await chargingData.findOne({_id: new ObjectId(params.oid)})));
        user_data = JSON.parse(JSON.stringify(await userData.findOne({email: 'mek.nielsen@gmail.com'}, {})));
        // refusion_data = await refusionData.findOne({}, {projection: {_id:0}});
        // let objectID = years_data._id;
        // const { _id, ...rest } = years_data;
        // years = rest;
    // } 

    console.log(user_data)

    // Ensures that the client will close when you finish/error
    // await client.close(); // Do not close here ... it will disrupt when loading file data

    return {
        user: user_data
    }
}

