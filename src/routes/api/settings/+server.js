import { MongoClient, ObjectId } from 'mongodb';

// Should be taken from env
const uri = "mongodb+srv://dbuser:c9xVny1kebf8Qsgg@cluster0.h3vfwbk.mongodb.net/";
const client = new MongoClient(uri);
const database = client.db('homecharger');
const refusionData = database.collection('refusionData');

/**
 * 
 * @param {*} param0 
 * @returns 
 */
export async function GET({params}) {
    try {
        const refusion_data = await refusionData.findOne({}, {projection: {_id:0}});
        return new Response(JSON.stringify(refusion_data), {status: 200})
    } catch(error) {
        console.log("Error: " + error)
        return new Response(JSON.stringify('No data ...'))
    };
}
