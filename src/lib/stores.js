// @ts-nocheck
import { writable } from 'svelte/store';

let today = new Date();
let month = today.getMonth();
month < 10 ? month = '0' + month : month;

month = '06';

export const _view = writable({
    year: '' + today.getFullYear(),
    month: month,
    day: '09' 
    // today.toLocaleDateString('da-DK', {day: '2-digit'}).slice(0, -1)
})  

export const _day = writable('03');