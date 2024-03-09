import "../../../../chunks/index.js";
import { r as refusion_db } from "../../../../chunks/db.js";
async function GET({ params }) {
  try {
    var data = await refusion_db.getData(`/`);
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.log("Error: " + error);
    return new Response(JSON.stringify("No data ..."));
  }
}
async function PUT({ params, request }) {
  var data = await request.json();
  refusion_db.push(`/`, data, true);
  return new Response(JSON.stringify(data), { status: 200 });
}
export {
  GET,
  PUT
};
