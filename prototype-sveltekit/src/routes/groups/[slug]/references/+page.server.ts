import { getGroupContent, getGroupSlugs } from '$lib/content';
import type { PageServerLoad } from './$types';

export const entries = () => getGroupSlugs().map((slug) => ({ slug }));

export const load: PageServerLoad = ({ params }) => {
  return getGroupContent(params.slug, undefined, 'references');
};
