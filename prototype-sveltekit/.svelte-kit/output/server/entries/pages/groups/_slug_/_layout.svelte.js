import "../../../../chunks/environment.js";
import { B as attr, H as escape_html, V as clsx, c as stringify, i as ensure_array_like, l as unsubscribe_stores, n as attr_class, s as store_get, tt as getContext } from "../../../../chunks/dev.js";
import "../../../../chunks/client.js";
//#region node_modules/@sveltejs/kit/src/runtime/app/stores.js
/**
* A function that returns all of the contextual stores. On the server, this must be called during component initialization.
* Only use this if you need to defer store subscription until after the component has mounted, for some reason.
*
* @deprecated Use `$app/state` instead (requires Svelte 5, [see docs for more info](https://svelte.dev/docs/kit/migrating-to-sveltekit-2#SvelteKit-2.12:-$app-stores-deprecated))
*/
var getStores = () => {
	const stores$1 = getContext("__svelte__");
	return {
		/** @type {typeof page} */
		page: { subscribe: stores$1.page.subscribe },
		/** @type {typeof navigating} */
		navigating: { subscribe: stores$1.navigating.subscribe },
		/** @type {typeof updated} */
		updated: stores$1.updated
	};
};
/**
* A readable store whose value contains page data.
*
* On the server, this store can only be subscribed to during component initialization. In the browser, it can be subscribed to at any time.
*
* @deprecated Use `page` from `$app/state` instead (requires Svelte 5, [see docs for more info](https://svelte.dev/docs/kit/migrating-to-sveltekit-2#SvelteKit-2.12:-$app-stores-deprecated))
* @type {import('svelte/store').Readable<import('@sveltejs/kit').Page>}
*/
var page = { subscribe(fn) {
	return getStores().page.subscribe(fn);
} };
//#endregion
//#region src/lib/components/Sidebar.svelte
function Sidebar($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		var $$store_subs;
		let { nav, groupName } = $$props;
		let openSections = new Set(nav.map((s) => s.title));
		$$renderer.push(`<aside class="w-60 shrink-0"><div class="sticky top-6">`);
		if (groupName) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="mb-3 px-3 py-2"><p class="text-[10px] font-semibold uppercase tracking-widest text-[#8b949e]">APT Group</p> <p class="text-sm font-bold text-[#58a6ff] truncate">${escape_html(groupName)}</p></div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> <nav class="bg-[#161b22] border border-[#30363d] rounded-lg overflow-hidden"><!--[-->`);
		const each_array = ensure_array_like(nav);
		for (let idx = 0, $$length = each_array.length; idx < $$length; idx++) {
			let section = each_array[idx];
			$$renderer.push(`<div${attr_class(clsx(idx > 0 ? "border-t border-[#30363d]" : ""))}><button class="w-full flex items-center justify-between px-4 py-2.5 text-[11px] font-bold uppercase tracking-widest text-[#8b949e] hover:bg-[#21262d] transition-colors text-left">${escape_html(section.title)} <span class="text-[10px] text-[#484f58]">${escape_html(openSections.has(section.title) ? "▼" : "▶")}</span></button> `);
			if (openSections.has(section.title)) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<ul class="pb-1"><!--[-->`);
				const each_array_1 = ensure_array_like(section.items);
				for (let $$index = 0, $$length = each_array_1.length; $$index < $$length; $$index++) {
					let item = each_array_1[$$index];
					const isActive = store_get($$store_subs ??= {}, "$page", page).url.pathname === item.href;
					$$renderer.push(`<li><a${attr("href", item.href)}${attr_class(`flex items-center px-4 py-1.5 text-sm transition-colors border-l-2 pl-[14px] ${stringify(isActive ? "text-[#58a6ff] bg-[#0d1117] border-[#58a6ff]" : "text-[#8b949e] hover:text-[#e6edf3] hover:bg-[#21262d] border-transparent")}`)}><span class="truncate">${escape_html(item.label)}</span></a></li>`);
				}
				$$renderer.push(`<!--]--></ul>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></div>`);
		}
		$$renderer.push(`<!--]--></nav></div></aside>`);
		if ($$store_subs) unsubscribe_stores($$store_subs);
	});
}
//#endregion
//#region src/routes/groups/[slug]/+layout.svelte
function _layout($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { data, children } = $$props;
		$$renderer.push(`<div class="max-w-screen-xl mx-auto px-4 py-8 flex gap-6 items-start">`);
		Sidebar($$renderer, {
			nav: data.nav,
			groupName: data.groupName
		});
		$$renderer.push(`<!----> <div class="flex-1 min-w-0">`);
		children($$renderer);
		$$renderer.push(`<!----></div></div>`);
	});
}
//#endregion
export { _layout as default };
