import { l as loadData } from "../../../../chunks/db.js";
import { j as json } from "../../../../chunks/index.js";
function GET() {
  let r = "Loading data from file ...";
  loadData();
  return json(r);
}
export {
  GET
};
