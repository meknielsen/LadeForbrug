import "../../../../../chunks/index.js";
import { r as refusion_db } from "../../../../../chunks/db.js";
async function GET({ params }) {
  try {
    var data = await refusion_db.getData(`/${params.year}`);
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.log("Error: " + error);
    return new Response(JSON.stringify({}));
  }
}
async function PUT({ params, request }) {
  var data = await request.json();
  refusion_db.push(`/${params.year}/`, data, true);
  return new Response(JSON.stringify(data), { status: 200 });
}
async function DELETE({ params, request }) {
  try {
    var data = await refusion_db.delete(`/${params.year}`);
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.log("Error: " + error);
    return new Response(JSON.stringify({}));
  }
}
export {
  DELETE,
  GET,
  PUT
};
