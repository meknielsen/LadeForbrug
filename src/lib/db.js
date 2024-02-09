// @ts-nocheck
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

export function loadData() {
  fs.createReadStream("elforbrug_2023_2024.csv")
  .pipe(parse({ relax_quotes: true, delimiter: ";", from_line: 2, ltrim: true, rtrim: true }))
  .on("data", function (r) {
    for (let i = 0; i < r.length; i++) {
        r[i]=r[i].replace(/"/g, "");
        r[i]=r[i].replace(/=/,"");
    }

    year = r[0].substring(6,10);
    month = r[0].substring(3,5);
    day = r[0].substring(0,2);
    hour = r[0].substring(11,13);
    price = r[2].split(" ")[0];
    db.push(`/${year}/${month}/${day}[${hour}]`, {price}, true);

  });
};

export function getDB() {
  return db;
}

export function getRefusionDB() {
  return refusion_db;
}