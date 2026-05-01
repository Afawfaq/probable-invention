import { getGroupContent, getGroupMeta, getGroupSlugs } from '$lib/content';
import type { PageServerLoad } from './$types';

export const entries = () => getGroupSlugs().map((slug) => ({ slug }));

export const load: PageServerLoad = ({ params }) => {
  const meta = getGroupMeta(params.slug);
  const { content } = getGroupContent(params.slug);
  return { meta, content };
};
