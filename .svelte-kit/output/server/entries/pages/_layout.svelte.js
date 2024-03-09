import { c as create_ssr_component, a as subscribe, b as set_store_value, d as add_attribute, v as validate_component } from "../../chunks/ssr.js";
import { _ as _active, I as Icon } from "../../chunks/Icon.js";
const app = "";
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $_active, $$unsubscribe__active;
  $$unsubscribe__active = subscribe(_active, (value) => $_active = value);
  set_store_value(_active, $_active = "year", $_active);
  $$unsubscribe__active();
  return `<div class="navbar bg-neutral text-neutral-content"><div class="navbar-start"><a href="/" class="btn btn-ghost text-xl" data-svelte-h="svelte-1y2wave">Ladeforbrug</a></div> <div class="navbar-center"><a class="btn btn-ghost"${add_attribute("href", null, 0)} data-svelte-h="svelte-1y5hbmq">Home</a> <a class="btn btn-ghost"${add_attribute("href", null, 0)} data-svelte-h="svelte-10xp43s">År</a> <a class="btn btn-ghost"${add_attribute("href", null, 0)} data-svelte-h="svelte-1kulk99">Måned</a> </div> <div class="flex justify-end flex-1 px-2"><div class="flex items-stretch"><div class="dropdown dropdown-end"><div tabindex="0" role="button" class="btn btn-ghost rounded-btn modal-button">${validate_component(Icon, "Icon").$$render(
    $$result,
    {
      icon: "mdi:settings-outline",
      class: "w-4 h-4 me-2"
    },
    {},
    {}
  )}</div>  <ul tabindex="0" class="menu dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-52 mt-4"><li><a${add_attribute("href", null, 0)} data-svelte-h="svelte-1xae3eo">Settings</a></li> <li><a${add_attribute("href", null, 0)} data-svelte-h="svelte-zcy82g">Summary</a></li> <li data-svelte-h="svelte-oscnb2"><a${add_attribute("href", null, 0)} onclick="load_data.showModal()">Load Data</a></li> <dialog id="load_data" class="modal"><div class="modal-box"><h3 class="font-bold text-lg" data-svelte-h="svelte-11v1goq">Upload file</h3> <div class="modal-action justify-center"><form method="post" enctype="multipart/form-data" class="w-full"><input id="file-upload" type="file" name="file" accept=".csv" class="file-input w-full max-w-xs"> <div class="flex h-10 pt-2 m-2 justify-center">${``}</div>  <button class="btn btn-primary min-w-20 mr-2" for="file-upload" ${""}>Add</button>  <button class="btn btn-accent min-w-20" data-svelte-h="svelte-192jr7c">Cancel</button></form></div></div></dialog></ul></div></div></div></div> <div class="flexor-content">${slots.default ? slots.default({}) : ``}</div>`;
});
export {
  Layout as default
};
