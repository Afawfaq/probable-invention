import { B as attr, H as escape_html, a as head, c as stringify, i as ensure_array_like } from "../../chunks/dev.js";
//#region src/routes/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { data } = $$props;
		head("1uha8ag", $$renderer, ($$renderer) => {
			$$renderer.title(($$renderer) => {
				$$renderer.push(`<title>APT Research Platform</title>`);
			});
		});
		$$renderer.push(`<div class="max-w-screen-xl mx-auto px-4 py-12"><section class="mb-14"><div class="flex items-center gap-2 mb-4"><span class="text-[10px] font-bold uppercase tracking-widest text-[#58a6ff] bg-[#0d2d6b] border border-[#1f5eb8] px-2 py-0.5 rounded">ADHD-Friendly</span> <span class="text-[10px] font-bold uppercase tracking-widest text-[#3fb950] bg-[#0d2b1e] border border-[#196c2e] px-2 py-0.5 rounded">Threat Intelligence</span></div> <h1 class="text-4xl sm:text-5xl font-extrabold text-[#e6edf3] mb-4 leading-tight">APT Research <span class="text-[#58a6ff]">Platform</span></h1> <p class="text-lg text-[#8b949e] max-w-2xl mb-6 leading-relaxed">Structured, readable threat intelligence on Advanced Persistent Threat groups. Designed for focus — clear visual hierarchy, colour-coded categories, and collapsible sections to reduce cognitive load.</p> <div class="flex flex-wrap gap-2 text-sm"><!--[-->`);
		const each_array = ensure_array_like([
			{
				icon: "🏗️",
				label: "Structured navigation"
			},
			{
				icon: "🎨",
				label: "Colour-coded categories"
			},
			{
				icon: "📦",
				label: "Collapsible sections"
			},
			{
				icon: "🔍",
				label: "Source-linked content"
			},
			{
				icon: "🧠",
				label: "MITRE ATT&CK mapping"
			}
		]);
		for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
			let feature = each_array[$$index];
			$$renderer.push(`<span class="flex items-center gap-1.5 bg-[#161b22] border border-[#30363d] px-3 py-1 rounded-full text-[#8b949e]"><span>${escape_html(feature.icon)}</span>${escape_html(feature.label)}</span>`);
		}
		$$renderer.push(`<!--]--></div></section> <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10"><!--[-->`);
		const each_array_1 = ensure_array_like([
			{
				value: String(data.groups.length),
				label: "APT Groups"
			},
			{
				value: "20+",
				label: "Content Files"
			},
			{
				value: "3",
				label: "Content Categories"
			},
			{
				value: "100%",
				label: "Open Source"
			}
		]);
		for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
			let stat = each_array_1[$$index_1];
			$$renderer.push(`<div class="bg-[#161b22] border border-[#30363d] rounded-lg px-4 py-3 text-center"><p class="text-2xl font-bold text-[#58a6ff]">${escape_html(stat.value)}</p> <p class="text-xs text-[#8b949e] uppercase tracking-wide mt-0.5">${escape_html(stat.label)}</p></div>`);
		}
		$$renderer.push(`<!--]--></div> <section><div class="flex items-center justify-between mb-5"><h2 class="text-xl font-bold text-[#e6edf3]">APT Groups</h2> <span class="text-sm text-[#8b949e]">${escape_html(data.groups.length)} group${escape_html(data.groups.length !== 1 ? "s" : "")}</span></div> <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"><!--[-->`);
		const each_array_2 = ensure_array_like(data.groups);
		for (let $$index_3 = 0, $$length = each_array_2.length; $$index_3 < $$length; $$index_3++) {
			let { slug, meta } = each_array_2[$$index_3];
			$$renderer.push(`<a${attr("href", `/groups/${stringify(slug)}`)} class="block bg-[#161b22] border border-[#30363d] rounded-lg p-5 hover:border-[#58a6ff] transition-colors"><div class="flex items-start justify-between gap-2 mb-3"><h3 class="text-lg font-bold text-[#e6edf3]">${escape_html(meta.title || slug)}</h3> `);
			if (meta.nation_state) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<span class="shrink-0 text-[10px] font-bold uppercase tracking-wide text-[#9e6a03] bg-[#272115] border border-[#5a3e1b] px-2 py-0.5 rounded">🏴 ${escape_html(meta.nation_state)}</span>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></div> `);
			if (meta.attribution) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<p class="text-sm text-[#8b949e] mb-3 leading-relaxed">${escape_html(meta.attribution)}</p>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> <div class="flex flex-wrap gap-1.5 mb-3">`);
			if (meta.active_since) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<span class="text-xs text-[#58a6ff] bg-[#0d1d3d] border border-[#1f3e7a] px-2 py-0.5 rounded">Since ${escape_html(meta.active_since)}</span>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> `);
			if (meta.source_code_available) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<span class="text-xs text-[#3fb950] bg-[#0d2b1e] border border-[#196c2e] px-2 py-0.5 rounded">⚡ Source code</span>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></div> `);
			if (meta.tags && meta.tags.length > 0) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<div class="flex flex-wrap gap-1"><!--[-->`);
				const each_array_3 = ensure_array_like(meta.tags.slice(0, 5));
				for (let $$index_2 = 0, $$length = each_array_3.length; $$index_2 < $$length; $$index_2++) {
					let tag = each_array_3[$$index_2];
					$$renderer.push(`<span class="text-[10px] text-[#8b949e] bg-[#21262d] border border-[#30363d] px-1.5 py-0.5 rounded">#${escape_html(tag)}</span>`);
				}
				$$renderer.push(`<!--]--></div>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></a>`);
		}
		$$renderer.push(`<!--]--></div></section></div>`);
	});
}
//#endregion
export { _page as default };
