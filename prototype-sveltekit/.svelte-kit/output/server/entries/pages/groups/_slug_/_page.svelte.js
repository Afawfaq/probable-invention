import { H as escape_html, a as head, i as ensure_array_like } from "../../../../chunks/dev.js";
import { t as MarkdownRenderer } from "../../../../chunks/MarkdownRenderer.js";
//#region src/routes/groups/[slug]/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { data } = $$props;
		head("1ez2i0v", $$renderer, ($$renderer) => {
			$$renderer.title(($$renderer) => {
				$$renderer.push(`<title>${escape_html(data.meta.title || "Group")} — APT Research Platform</title>`);
			});
		});
		$$renderer.push(`<div><div class="bg-[#161b22] border border-[#30363d] rounded-lg p-5 mb-8"><div class="flex flex-wrap items-start justify-between gap-3 mb-4"><div><h1 class="text-2xl font-bold text-[#e6edf3] mb-1">${escape_html(data.meta.title || "")}</h1> `);
		if (data.meta.attribution) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<p class="text-sm text-[#8b949e]">${escape_html(data.meta.attribution)}</p>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div> <div class="flex flex-wrap gap-2">`);
		if (data.meta.nation_state) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<span class="text-[10px] font-bold uppercase tracking-wide text-[#9e6a03] bg-[#272115] border border-[#5a3e1b] px-2 py-0.5 rounded">🏴 ${escape_html(data.meta.nation_state)}</span>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> `);
		if (data.meta.source_code_available) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<span class="text-[10px] font-bold uppercase tracking-wide text-[#3fb950] bg-[#0d2b1e] border border-[#196c2e] px-2 py-0.5 rounded">⚡ Source code available</span>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div></div> <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs mb-4">`);
		if (data.meta.active_since) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div><p class="text-[#8b949e] uppercase tracking-wide mb-0.5">Active Since</p> <p class="text-[#58a6ff] font-semibold">${escape_html(data.meta.active_since)}</p></div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> `);
		if (data.meta.discovered) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div><p class="text-[#8b949e] uppercase tracking-wide mb-0.5">Discovered</p> <p class="text-[#e6edf3] font-semibold">${escape_html(data.meta.discovered)}</p></div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> `);
		if (data.meta.discovered_by) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div><p class="text-[#8b949e] uppercase tracking-wide mb-0.5">Discovered By</p> <p class="text-[#e6edf3]">${escape_html(data.meta.discovered_by)}</p></div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> `);
		if (data.meta.mitre_group_id) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div><p class="text-[#8b949e] uppercase tracking-wide mb-0.5">MITRE ID</p> <p class="font-mono text-[#d29922]">${escape_html(data.meta.mitre_group_id)}</p></div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div> `);
		if (data.meta.tags && data.meta.tags.length > 0) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="flex flex-wrap gap-1.5"><!--[-->`);
			const each_array = ensure_array_like(data.meta.tags);
			for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
				let tag = each_array[$$index];
				$$renderer.push(`<span class="text-[10px] text-[#8b949e] bg-[#21262d] border border-[#30363d] px-1.5 py-0.5 rounded">#${escape_html(tag)}</span>`);
			}
			$$renderer.push(`<!--]--></div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div> `);
		MarkdownRenderer($$renderer, { content: data.content });
		$$renderer.push(`<!----></div>`);
	});
}
//#endregion
export { _page as default };
