// @ts-nocheck
import { loadData } from '$lib/db.js';
import { json } from '@sveltejs/kit';

export function GET() {
	
    let r = "Loading data from file ...";

    loadData();

	return json(r);
}