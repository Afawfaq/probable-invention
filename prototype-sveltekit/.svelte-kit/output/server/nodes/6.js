import * as server from '../entries/pages/groups/_slug_/references/_page.server.ts.js';

export const index = 6;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/groups/_slug_/references/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/groups/[slug]/references/+page.server.ts";
export const imports = ["_app/immutable/nodes/6.BdQjIf09.js","_app/immutable/chunks/ByYtQ-vD.js","_app/immutable/chunks/CFnC5QgD.js","_app/immutable/chunks/v_jBEYI6.js"];
export const stylesheets = ["_app/immutable/assets/MarkdownRenderer.DvjcTajA.css"];
export const fonts = [];
