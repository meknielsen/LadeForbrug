import { refusion_db } from '$lib/db.js';

import { MongoClient, ObjectId } from 'mongodb';

// Should be taken from env
const uri = "mongodb+srv://dbuser:c9xVny1kebf8Qsgg@cluster0.h3vfwbk.mongodb.net/";
const client = new MongoClient(uri);
const database = client.db('homecharger');
const refusionData = database.collection('refusionData');

// /**
//  * 
//  * @param {*} param0 
//  * @returns 
//  */
// export async function GET({params}) {
//     try {
//         const refusion_data = await refusionData.findOne({}, {projection: {_id:0}});
//         console.log('in here')
//         return new Response(JSON.stringify(refusion_data), {status: 200})
//     } catch(error) {
//         console.log("Error: " + error)
//         return new Response(JSON.stringify({}))
//     };
// }

/**
 * 
 * @param {*} request : resource 
 * @returns 
 */
export async function PUT({ params, request }) {
    var data = await request.json();
    var refusion_data = JSON.parse(JSON.stringify(await refusionData.findOne({_id: new ObjectId('65f2280bdad5def9c1e2ad10')}, {projection: {_id:0}})));

    refusion_data[params.year] = data;
    console.log(refusion_data[params.year])
    // console.log(data)
    refusion_db.push(`/${params.year}/`, data, true);

    const result = await refusionData.updateOne({_id: new ObjectId('65f2280bdad5def9c1e2ad10')}, {$set: refusion_data})
    
    return new Response(JSON.stringify(data), {status: 200})
}

export async function DELETE({params, request}) {
    try {
        var data = await refusion_db.delete(`/${params.year}`);
        return new Response(JSON.stringify(data), {status: 200})
    } catch(error) {
        console.log("Error: " + error)
        return new Response(JSON.stringify({}))
    };

}