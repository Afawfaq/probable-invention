// @ts-nocheck
import { getGroupContent, getGroupSlugs } from '$lib/content';
import type { PageServerLoad } from './$types';

export const entries = () => getGroupSlugs().map((slug) => ({ slug }));

export const load = ({ params }: Parameters<PageServerLoad>[0]) => {
  return getGroupContent(params.slug, undefined, 'timeline');
};
