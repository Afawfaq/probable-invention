import { n as getGroupContent, t as getAllGroupDetailParams } from "../../../../../../chunks/content.js";
//#region src/routes/groups/[slug]/[section]/[item]/+page.server.ts
var entries = () => getAllGroupDetailParams();
var load = ({ params }) => {
	const { frontmatter, content } = getGroupContent(params.slug, params.section, params.item);
	return {
		frontmatter,
		content,
		section: params.section,
		item: params.item
	};
};
//#endregion
export { entries, load };
