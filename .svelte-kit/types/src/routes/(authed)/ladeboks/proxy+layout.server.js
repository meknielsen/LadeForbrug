// @ts-nocheck

// @ts-nocheck
process.env.NODE_NO_WARNINGS = 'stream/web';

import { loadData, refusion_db } from '$lib/db.js';
import { CONNREFUSED } from 'dns';
import { MongoClient, ObjectId } from 'mongodb';
import {_user} from '$lib/stores.svelte.js';

// Should be taken from env
const uri = "mongodb+srv://dbuser:c9xVny1kebf8Qsgg@cluster0.h3vfwbk.mongodb.net/";
const client = new MongoClient(uri);
const database = client.db('homecharger');
const chargingData = database.collection('chargingData');
const refusionData = database.collection('refusionData');
const userData = database.collection('userData');
const options = {projection: { _id: 1}  };

/** @param {Parameters<import('./$types').PageServerLoad>[0]} event */

export async function load({locals}) {

    let user_data = JSON.parse(JSON.stringify(await userData.findOne({email: 'mek.nielsen@gmail.com'}, {})));

    return {
        user: user_data
    }
}





