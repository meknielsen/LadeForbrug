import { JsonDB, Config } from "node-json-db";
process.env.NODE_NO_WARNINGS = "stream/web";
process.noDeprecation = true;
var db = new JsonDB(new Config("ChargingData", true, true, "/"));
var refusion_db = new JsonDB(new Config("RefusionData", true, true, "/"));
let year;
let month;
let day;
let hour;
let price;
async function loadData(ds) {
  const lines = ds.split("\n");
  let r;
  for (let i = 1; i < lines.length; i++) {
    if (lines[i] !== void 0 && lines[i].length > 0) {
      lines[i] = lines[i].replace(/"/g, "");
      lines[i] = lines[i].replace(/=/g, "");
      r = lines[i].split(";");
      year = r[0].substring(6, 10);
      month = r[0].substring(3, 5);
      day = r[0].substring(0, 2);
      hour = r[0].substring(11, 13);
      price = r[2].split(" ")[0];
      db.push(`/${year}/${month}/${day}[${hour}]`, { price }, true);
    }
  }
}
export {
  db as d,
  loadData as l,
  refusion_db as r
};
