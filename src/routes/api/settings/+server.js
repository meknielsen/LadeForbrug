import { json } from '@sveltejs/kit';
import { refusion_db } from '$lib/db.js';

/**
 * 
 * @param {*} param0 
 * @returns 
 */
export async function GET({params}) {
    try {
        var data = await refusion_db.getData(`/`);
        return new Response(JSON.stringify(data), {status: 200})
    } catch(error) {
        console.log("Error: " + error)
        return new Response(JSON.stringify('No data ...'))
    };
}

/**
 * 
 * @param {*} request : resource 
 * @returns 
 */
export async function PUT({ params, request }) {
    var data = await request.json();
    refusion_db.push(`/`, data, true);
    return new Response(JSON.stringify(data), {status: 200})
}
