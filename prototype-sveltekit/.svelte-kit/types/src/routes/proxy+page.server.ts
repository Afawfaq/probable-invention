// @ts-nocheck
import { getGroupSlugs, getGroupMeta } from '$lib/content';
import type { PageServerLoad } from './$types';

export const load = () => {
  const slugs = getGroupSlugs();
  const groups = slugs.map((slug) => ({ slug, meta: getGroupMeta(slug) }));
  return { groups };
};
;null as any as PageServerLoad;