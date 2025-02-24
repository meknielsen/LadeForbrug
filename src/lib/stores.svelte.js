// @ts-nocheck
import { writable } from 'svelte/store';

let today = new Date();
let year = '';
// let year = today.getFullYear();
let month = today.getMonth();
let day = '01';

// Date.prototype.getMonth() returns month for this date according to local time, as a zero-based value 
// (where zero indicates the first month of the year).
// Therefore, this represent previous full month, intended for this store to return when page is loaded first time. 

// month == 0 ? month = 12 : month = month; // make sure December is returned if in January
// month == 12 ? year = today.getFullYear() - 1 : year = today.getFullYear();

month = month + 1;
month < 10 ? month = '0' + month : '' + month; // convert to String representation



// console.log('Stores: ' + month)

// month = '06'

export const _view = writable({
    year: '' + year,
    month: '' + month,
    day: day 
    // today.toLocaleDateString('da-DK', {day: '2-digit'}).slice(0, -1)
}) 

export const _data = writable({})
export const _active = writable()
export const _treshold = writable(0);

// SvelteKit5 reactivity rune
export const user = $state({profile: {_id: '', name: '', surname: '', email: '', chargers: []}});