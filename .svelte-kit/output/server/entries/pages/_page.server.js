import { d as db, r as refusion_db, l as loadData } from "../../chunks/db.js";
import "../../chunks/index.js";
process.env.NODE_NO_WARNINGS = "stream/web";
async function load({}) {
  const years = await db.getData(`/`);
  const refusion_data = await refusion_db.getData(`/`);
  return {
    years,
    refusion_data
  };
}
const actions = {
  default: async ({ request }) => {
    const formData = await request.formData();
    const fileName = formData.get("file");
    if (fileName.name.endsWith(".csv")) {
      const filetext = await fileName.text();
      loadData(filetext);
      return { success: true };
    } else {
      return { message: "File extension must be .csv" };
    }
  }
};
export {
  actions,
  load
};
