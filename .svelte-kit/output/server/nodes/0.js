

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.d0dc20da.js","_app/immutable/chunks/scheduler.70a1b022.js","_app/immutable/chunks/index.1e5570e2.js","_app/immutable/chunks/Icon.fea847b9.js","_app/immutable/chunks/index.b2cc0c2e.js"];
export const stylesheets = ["_app/immutable/assets/0.740f8f6c.css"];
export const fonts = [];
