import { H as escape_html, a as head } from "../../../../../chunks/dev.js";
import { t as MarkdownRenderer } from "../../../../../chunks/MarkdownRenderer.js";
//#region src/routes/groups/[slug]/references/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { data } = $$props;
		head("1d5u2ew", $$renderer, ($$renderer) => {
			$$renderer.title(($$renderer) => {
				$$renderer.push(`<title>${escape_html(data.frontmatter.title || "References")} — APT Research Platform</title>`);
			});
		});
		$$renderer.push(`<div><div class="mb-6"><h1 class="text-2xl font-bold text-[#e6edf3]">${escape_html(data.frontmatter.title || "References")}</h1></div> `);
		MarkdownRenderer($$renderer, { content: data.content });
		$$renderer.push(`<!----></div>`);
	});
}
//#endregion
export { _page as default };
