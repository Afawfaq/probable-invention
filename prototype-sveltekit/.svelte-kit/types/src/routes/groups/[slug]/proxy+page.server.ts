// @ts-nocheck
import { getGroupContent, getGroupMeta, getGroupSlugs } from '$lib/content';
import type { PageServerLoad } from './$types';

export const entries = () => getGroupSlugs().map((slug) => ({ slug }));

export const load = ({ params }: Parameters<PageServerLoad>[0]) => {
  const meta = getGroupMeta(params.slug);
  const { content } = getGroupContent(params.slug);
  return { meta, content };
};
