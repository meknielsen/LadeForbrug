// @ts-nocheck
import { getMonthTotal } from '$lib/db.js'

export async function GET({params}) {
    try {
        var data = await getMonthTotal(`/${params.year}/${params.month}`);
        return new Response(JSON.stringify(data), {status: 200});
    } catch(error) {
        console.log("Error: " + error)
        return new Response(JSON.stringify('No data ...'))
    };
}