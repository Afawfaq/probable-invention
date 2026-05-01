import * as server from '../entries/pages/groups/_slug_/_layout.server.ts.js';

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/groups/_slug_/_layout.svelte.js')).default;
export { server };
export const server_id = "src/routes/groups/[slug]/+layout.server.ts";
export const imports = ["_app/immutable/nodes/2.6eMMrXVn.js","_app/immutable/chunks/ByYtQ-vD.js","_app/immutable/chunks/DZbpAx1Q.js","_app/immutable/chunks/v_jBEYI6.js"];
export const stylesheets = [];
export const fonts = [];
