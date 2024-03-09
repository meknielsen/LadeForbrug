export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.ico","favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {"start":"_app/immutable/entry/start.50e06247.js","app":"_app/immutable/entry/app.7987bfb1.js","imports":["_app/immutable/entry/start.50e06247.js","_app/immutable/chunks/scheduler.70a1b022.js","_app/immutable/chunks/singletons.f73b2255.js","_app/immutable/chunks/index.b2cc0c2e.js","_app/immutable/entry/app.7987bfb1.js","_app/immutable/chunks/scheduler.70a1b022.js","_app/immutable/chunks/index.1e5570e2.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/api/load",
				pattern: /^\/api\/load\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/load/_server.js'))
			},
			{
				id: "/api/settings",
				pattern: /^\/api\/settings\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/settings/_server.js'))
			},
			{
				id: "/api/settings/[year]",
				pattern: /^\/api\/settings\/([^/]+?)\/?$/,
				params: [{"name":"year","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/settings/_year_/_server.js'))
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
}
})();
