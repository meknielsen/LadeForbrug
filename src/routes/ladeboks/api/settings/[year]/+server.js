import { refusion_db } from '$lib/db.js';

import { MongoClient, ObjectId } from 'mongodb';

// Should be taken from env
const uri = "mongodb+srv://dbuser:c9xVny1kebf8Qsgg@cluster0.h3vfwbk.mongodb.net/";
const client = new MongoClient(uri);
const database = client.db('homecharger');
const refusionData = database.collection('refusionData');

//_id for refusion data should be dynamically picked up 

/**
 * 
 * @param {*} request : resource 
 * @returns 
 */
export async function PUT({ params, request }) {
    var data = await request.json();
    var refusion_data = JSON.parse(JSON.stringify(await refusionData.findOne({_id: new ObjectId('65f2280bdad5def9c1e2ad10')}, {projection: {_id:0}})));

    refusion_data[params.year] = data;

    await refusionData.updateOne({_id: new ObjectId('65f2280bdad5def9c1e2ad10')}, {$set: refusion_data})
    
    return new Response(JSON.stringify(data), {status: 200})
}

export async function DELETE({params, request}) {
    try {
        const result = await refusionData.updateOne({_id: new ObjectId('65f2280bdad5def9c1e2ad10')}, {$unset: {[params.year]: ""}})
        return new Response(JSON.stringify(result), {status: 200})
    } catch(error) {
        console.log("Error: " + error)
        return new Response(JSON.stringify({}))
    };

}