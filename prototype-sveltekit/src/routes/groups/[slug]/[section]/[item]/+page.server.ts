import { getGroupContent, getAllGroupDetailParams } from '$lib/content';
import type { PageServerLoad } from './$types';

export const entries = () => getAllGroupDetailParams();

export const load: PageServerLoad = ({ params }) => {
  const { frontmatter, content } = getGroupContent(params.slug, params.section, params.item);
  return { frontmatter, content, section: params.section, item: params.item };
};
