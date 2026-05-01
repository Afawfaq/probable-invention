import fs from "fs";
import path from "path";
import matter from "gray-matter";
//#region src/lib/content.ts
var CONTENT_DIR = path.resolve(process.cwd(), "..", "content");
var APT_GROUPS_DIR = path.join(CONTENT_DIR, "apt-groups");
function getGroupSlugs() {
	if (!fs.existsSync(APT_GROUPS_DIR)) return [];
	return fs.readdirSync(APT_GROUPS_DIR).filter((f) => fs.statSync(path.join(APT_GROUPS_DIR, f)).isDirectory());
}
function getGroupMeta(slug) {
	const filePath = path.join(APT_GROUPS_DIR, slug, "overview.md");
	const { data } = matter(fs.readFileSync(filePath, "utf-8"));
	return data;
}
function getGroupContent(slug, section, item) {
	const safeItem = item ? item.replace(/\.md$/, "") : item;
	let filePath;
	if (section && safeItem) filePath = path.join(APT_GROUPS_DIR, slug, section, `${safeItem}.md`);
	else if (!section && safeItem) filePath = path.join(APT_GROUPS_DIR, slug, `${safeItem}.md`);
	else filePath = path.join(APT_GROUPS_DIR, slug, "overview.md");
	const { data, content } = matter(fs.readFileSync(filePath, "utf-8"));
	return {
		frontmatter: data,
		content
	};
}
function readTitle(filePath, fallback) {
	try {
		const { data } = matter(fs.readFileSync(filePath, "utf-8"));
		return data.title || fallback;
	} catch {
		return fallback;
	}
}
function toLabel(slug) {
	return slug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}
function getGroupNav(slug) {
	const groupDir = path.join(APT_GROUPS_DIR, slug);
	const nav = [];
	const overviewItems = [{
		label: "Overview",
		href: `/groups/${slug}`
	}];
	for (const item of ["timeline", "references"]) if (fs.existsSync(path.join(groupDir, `${item}.md`))) overviewItems.push({
		label: toLabel(item),
		href: `/groups/${slug}/${item}`
	});
	nav.push({
		title: "Overview",
		items: overviewItems
	});
	for (const section of [
		"malware",
		"shadowbrokers-dump",
		"ttps"
	]) {
		const sectionTitles = {
			malware: "Malware Arsenal",
			"shadowbrokers-dump": "ShadowBrokers Dump",
			ttps: "TTPs"
		};
		const dir = path.join(groupDir, section);
		if (!fs.existsSync(dir)) continue;
		const files = fs.readdirSync(dir).filter((f) => f.endsWith(".md"));
		nav.push({
			title: sectionTitles[section],
			items: files.map((f) => {
				const itemSlug = f.replace(".md", "");
				return {
					label: readTitle(path.join(dir, f), itemSlug.toUpperCase()),
					href: `/groups/${slug}/${section}/${itemSlug}`
				};
			})
		});
	}
	return nav;
}
function getAllGroupDetailParams() {
	const params = [];
	for (const slug of getGroupSlugs()) {
		const groupDir = path.join(APT_GROUPS_DIR, slug);
		for (const section of [
			"malware",
			"shadowbrokers-dump",
			"ttps"
		]) {
			const dir = path.join(groupDir, section);
			if (!fs.existsSync(dir)) continue;
			fs.readdirSync(dir).filter((f) => f.endsWith(".md")).forEach((f) => params.push({
				slug,
				section,
				item: f.replace(".md", "")
			}));
		}
	}
	return params;
}
//#endregion
export { getGroupSlugs as a, getGroupNav as i, getGroupContent as n, getGroupMeta as r, getAllGroupDetailParams as t };
