// @ts-nocheck
import * as fs from 'fs';
import { parse } from 'csv-parse';
import { JsonDB, Config } from 'node-json-db';

export var db = new JsonDB(new Config("ChargingData", true, true, '/'));

let year;
let month;
let day;
let hour;
let price;

export function loadData() {
  fs.createReadStream("elforbrug_2023.csv")
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

export async function getDayTotal(year_month_day) {
  let total_obj = await db.getData(year_month_day);
  let total = 0;
  for (let i = 0; i < total_obj.length; i++) {
    total += parseFloat(total_obj[i].price.replace(/,/g, '.'));
  }
  return total.toFixed;
}

export async function getMonthTotal(year_month) {
  let month_obj = await db.getData(year_month);
  let total_obj = Object.values(month_obj);
  let total = 0;
  for ( let j = 0; j < total_obj.length; j++) {
    for (let i = 0; i < total_obj[j].length; i++) {
      total += parseFloat(total_obj[j][i].price.replace(/,/g, '.'));
    }
  }
  return total.toFixed(2);
}