import { r as derived, u as html } from "./dev.js";
import { marked } from "marked";
//#region src/lib/components/MarkdownRenderer.svelte
function MarkdownRenderer($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { content } = $$props;
		const html$1 = derived(() => marked(content, {
			breaks: false,
			gfm: true
		}));
		$$renderer.push(`<article class="prose-apt min-w-0 svelte-1fegv8i">${html(html$1())}</article>`);
	});
}
//#endregion
export { MarkdownRenderer as t };
