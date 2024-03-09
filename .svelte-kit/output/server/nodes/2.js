import * as server from '../entries/pages/_page.server.js';

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/+page.server.js";
export const imports = ["_app/immutable/nodes/2.4a6e76a9.js","_app/immutable/chunks/scheduler.70a1b022.js","_app/immutable/chunks/index.1e5570e2.js","_app/immutable/chunks/Icon.fea847b9.js","_app/immutable/chunks/index.b2cc0c2e.js"];
export const stylesheets = ["_app/immutable/assets/2.fc4e0a68.css"];
export const fonts = [];
