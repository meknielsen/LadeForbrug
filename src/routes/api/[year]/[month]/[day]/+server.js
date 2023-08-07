// @ts-nocheck
import { error } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';
import { db } from '$lib/db.js'

export async function GET({params}) {
    try {
        var data = await db.getData(`/${params.year}/${params.month}/${params.day}`);
        return new Response(JSON.stringify(data), {status: 200})
    } catch(error) {
        console.log("Error: " + error)
        return new Response(JSON.stringify('No data ...'))
    };
}
