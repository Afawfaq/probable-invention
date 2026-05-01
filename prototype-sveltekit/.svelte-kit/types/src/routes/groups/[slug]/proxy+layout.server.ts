// @ts-nocheck
import { getGroupNav, getGroupMeta } from '$lib/content';
import type { LayoutServerLoad } from './$types';

export const load = ({ params }: Parameters<LayoutServerLoad>[0]) => {
  const nav = getGroupNav(params.slug);
  const meta = getGroupMeta(params.slug);
  return { nav, groupName: (meta.title as string) || params.slug };
};
