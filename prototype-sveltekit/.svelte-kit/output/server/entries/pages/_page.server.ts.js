import { a as getGroupSlugs, r as getGroupMeta } from "../../chunks/content.js";
//#region src/routes/+page.server.ts
var load = () => {
	return { groups: getGroupSlugs().map((slug) => ({
		slug,
		meta: getGroupMeta(slug)
	})) };
};
//#endregion
export { load };
