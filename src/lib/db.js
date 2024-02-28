// @ts-nocheck

process.env.NODE_NO_WARNINGS = 'stream/web';
process.noDeprecation = true;

import * as fs from 'fs';
import { parse } from 'csv-parse';
import { JsonDB, Config } from 'node-json-db';

export var db = new JsonDB(new Config("ChargingData", true, true, '/'));
export var refusion_db = new JsonDB(new Config("RefusionData", true, true, '/'));

let year;
let month;
let day;
let hour;
let price;

export async function loadData(ds) {

  const lines = ds.split('\n');
  let r;

  // Some check of file content should be here ... 

  for (let i = 1; i < lines.length; i++) {
    if ( lines[i] !== undefined  && lines[i].length > 0 ) {
      lines[i] = lines[i].replace(/"/g, "");
      lines[i] = lines[i].replace(/=/g, "");

      r = lines[i].split(";");

      year = r[0].substring(6,10);
      month = r[0].substring(3,5);
      day = r[0].substring(0,2);
      hour = r[0].substring(11,13);
      price = r[2].split(" ")[0];
      db.push(`/${year}/${month}/${day}[${hour}]`, {price}, true);
      // console.log(`/${year}/${month}/${day}[${hour}]:` + price);
    }
  }
};

export function getDB() {
  return db;
}

export function getRefusionDB() {
  return refusion_db;
}