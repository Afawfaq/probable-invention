import { buildGraphData } from '$lib/graph';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = () => {
  return { graphData: buildGraphData() };
};
