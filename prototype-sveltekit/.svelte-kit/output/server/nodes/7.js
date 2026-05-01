import * as server from '../entries/pages/groups/_slug_/timeline/_page.server.ts.js';

export const index = 7;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/groups/_slug_/timeline/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/groups/[slug]/timeline/+page.server.ts";
export const imports = ["_app/immutable/nodes/7.DMoucNVP.js","_app/immutable/chunks/ByYtQ-vD.js","_app/immutable/chunks/CFnC5QgD.js","_app/immutable/chunks/v_jBEYI6.js"];
export const stylesheets = ["_app/immutable/assets/MarkdownRenderer.DvjcTajA.css"];
export const fonts = [];
