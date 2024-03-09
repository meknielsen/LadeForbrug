

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.649000c4.js","_app/immutable/chunks/scheduler.70a1b022.js","_app/immutable/chunks/index.1e5570e2.js","_app/immutable/chunks/singletons.f73b2255.js","_app/immutable/chunks/index.b2cc0c2e.js"];
export const stylesheets = [];
export const fonts = [];
