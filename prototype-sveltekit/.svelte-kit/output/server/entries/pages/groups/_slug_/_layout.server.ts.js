import { i as getGroupNav, r as getGroupMeta } from "../../../../chunks/content.js";
//#region src/routes/groups/[slug]/+layout.server.ts
var load = ({ params }) => {
	return {
		nav: getGroupNav(params.slug),
		groupName: getGroupMeta(params.slug).title || params.slug
	};
};
//#endregion
export { load };
