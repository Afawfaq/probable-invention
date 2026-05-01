import { a as getGroupSlugs, n as getGroupContent, r as getGroupMeta } from "../../../../chunks/content.js";
//#region src/routes/groups/[slug]/+page.server.ts
var entries = () => getGroupSlugs().map((slug) => ({ slug }));
var load = ({ params }) => {
	const meta = getGroupMeta(params.slug);
	const { content } = getGroupContent(params.slug);
	return {
		meta,
		content
	};
};
//#endregion
export { entries, load };
