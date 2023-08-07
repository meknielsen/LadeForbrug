// @ts-nocheck
import { getDayTotal } from '$lib/db.js'

export async function GET({params}) {
    try {
        var data = await getDayTotal(`/${params.year}/${params.month}/${params.day}`);
        return new Response(JSON.stringify(data), {status: 200});
    } catch(error) {
        console.log("Error: " + error)
        return new Response(JSON.stringify('No data ...'))
    };
}