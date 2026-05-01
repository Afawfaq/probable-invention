import { a as getGroupSlugs, n as getGroupContent } from "../../../../../chunks/content.js";
//#region src/routes/groups/[slug]/references/+page.server.ts
var entries = () => getGroupSlugs().map((slug) => ({ slug }));
var load = ({ params }) => {
	return getGroupContent(params.slug, void 0, "references");
};
//#endregion
export { entries, load };
