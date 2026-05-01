import * as server from '../entries/pages/_page.server.ts.js';

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/+page.server.ts";
export const imports = ["_app/immutable/nodes/3.BuVO4EpA.js","_app/immutable/chunks/ByYtQ-vD.js","_app/immutable/chunks/v_jBEYI6.js"];
export const stylesheets = [];
export const fonts = [];
