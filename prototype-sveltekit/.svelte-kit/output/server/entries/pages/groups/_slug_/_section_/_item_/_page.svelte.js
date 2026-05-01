import { H as escape_html, a as head, c as stringify, i as ensure_array_like, n as attr_class } from "../../../../../../chunks/dev.js";
import { t as MarkdownRenderer } from "../../../../../../chunks/MarkdownRenderer.js";
//#region src/routes/groups/[slug]/[section]/[item]/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { data } = $$props;
		const sectionLabels = {
			malware: "Malware Arsenal",
			"shadowbrokers-dump": "ShadowBrokers Dump",
			ttps: "TTPs"
		};
		const sectionColors = {
			malware: "text-[#f85149] bg-[#2d1a1e] border-[#5a2020]",
			"shadowbrokers-dump": "text-[#d29922] bg-[#272115] border-[#5a3e1b]",
			ttps: "text-[#58a6ff] bg-[#0d2d6b] border-[#1f5eb8]"
		};
		head("4qjadx", $$renderer, ($$renderer) => {
			$$renderer.title(($$renderer) => {
				$$renderer.push(`<title>${escape_html(data.frontmatter.title || data.item)} — APT Research Platform</title>`);
			});
		});
		$$renderer.push(`<div><div class="flex items-center gap-2 mb-5 text-sm text-[#8b949e]"><span${attr_class(`text-[11px] font-bold uppercase tracking-widest border px-2 py-0.5 rounded ${stringify(sectionColors[data.section] || "text-[#8b949e] bg-[#21262d] border-[#30363d]")}`)}>${escape_html(sectionLabels[data.section] || data.section)}</span> <span class="text-[#484f58]">/</span> <span class="text-[#e6edf3]">${escape_html(data.frontmatter.title || data.item)}</span></div> <div class="bg-[#161b22] border border-[#30363d] rounded-lg p-5 mb-8"><div class="flex flex-wrap items-start justify-between gap-3 mb-3"><h1 class="text-2xl font-bold text-[#e6edf3]">${escape_html(data.frontmatter.title || data.item)}</h1> `);
		if (data.section === "malware") {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<span class="text-[10px] font-bold uppercase tracking-wide text-[#f85149] bg-[#2d1a1e] border border-[#5a2020] px-2 py-0.5 rounded">🦠 Malware</span>`);
		} else if (data.section === "shadowbrokers-dump") {
			$$renderer.push("<!--[1-->");
			$$renderer.push(`<span class="text-[10px] font-bold uppercase tracking-wide text-[#d29922] bg-[#272115] border border-[#5a3e1b] px-2 py-0.5 rounded">⚠️ ShadowBrokers Dump</span>`);
		} else if (data.section === "ttps") {
			$$renderer.push("<!--[2-->");
			$$renderer.push(`<span class="text-[10px] font-bold uppercase tracking-wide text-[#58a6ff] bg-[#0d2d6b] border border-[#1f5eb8] px-2 py-0.5 rounded">⚔️ TTP</span>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div> <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">`);
		if (data.frontmatter.platform) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div><p class="text-[#8b949e] uppercase tracking-wide mb-0.5">Platform</p> <p class="text-[#e6edf3]">${escape_html(data.frontmatter.platform)}</p></div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> `);
		if (data.frontmatter.category) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div><p class="text-[#8b949e] uppercase tracking-wide mb-0.5">Category</p> <p class="text-[#e6edf3] capitalize">${escape_html(data.frontmatter.category)}</p></div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> `);
		if (typeof data.frontmatter.source_available === "boolean") {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div><p class="text-[#8b949e] uppercase tracking-wide mb-0.5">Source Available</p> <p${attr_class(data.frontmatter.source_available ? "text-[#3fb950]" : "text-[#f85149]")}>${escape_html(data.frontmatter.source_available ? "✓ Yes" : "✗ No")}</p></div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div> `);
		if (data.frontmatter.mitre_techniques && Array.isArray(data.frontmatter.mitre_techniques) && data.frontmatter.mitre_techniques.length > 0) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="mt-3 pt-3 border-t border-[#30363d]"><p class="text-[#8b949e] text-xs uppercase tracking-wide mb-1.5">MITRE Techniques</p> <div class="flex flex-wrap gap-1.5"><!--[-->`);
			const each_array = ensure_array_like(data.frontmatter.mitre_techniques);
			for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
				let t = each_array[$$index];
				$$renderer.push(`<span class="text-[10px] font-mono text-[#d29922] bg-[#272115] border border-[#5a3e1b] px-2 py-0.5 rounded">${escape_html(t.split(/\s+/)[0])}</span>`);
			}
			$$renderer.push(`<!--]--></div></div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> `);
		if (data.frontmatter.tags && Array.isArray(data.frontmatter.tags) && data.frontmatter.tags.length > 0) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="mt-3 pt-3 border-t border-[#30363d]"><div class="flex flex-wrap gap-1.5"><!--[-->`);
			const each_array_1 = ensure_array_like(data.frontmatter.tags);
			for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
				let tag = each_array_1[$$index_1];
				$$renderer.push(`<span class="text-[10px] text-[#8b949e] bg-[#21262d] border border-[#30363d] px-1.5 py-0.5 rounded">#${escape_html(tag)}</span>`);
			}
			$$renderer.push(`<!--]--></div></div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div> `);
		MarkdownRenderer($$renderer, { content: data.content });
		$$renderer.push(`<!----></div>`);
	});
}
//#endregion
export { _page as default };
