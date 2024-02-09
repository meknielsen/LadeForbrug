import { json } from '@sveltejs/kit';
import { refusion_db } from '$lib/db.js';

/**
 * 
 * @param {*} param0 
 * @returns 
 */
export async function GET({params}) {
    try {
        var data = await refusion_db.getData(`/${params.year}`);
        return new Response(JSON.stringify(data), {status: 200})
    } catch(error) {
        console.log("Error: " + error)
        return new Response(JSON.stringify({}))
    };
}

/**
 * 
 * @param {*} request : resource 
 * @returns 
 */
export async function PUT({ params, request }) {
    var data = await request.json();
    refusion_db.push(`/${params.year}/`, data, true);
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