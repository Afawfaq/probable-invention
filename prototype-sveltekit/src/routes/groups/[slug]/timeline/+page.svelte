<script lang="ts">
  import MarkdownRenderer from '$lib/components/MarkdownRenderer.svelte';
  import type { PageData } from './$types';
  let { data }: { data: PageData } = $props();
</script>

<svelte:head><title>{(data.frontmatter.title as string) || 'Timeline'} — APT Research Platform</title></svelte:head>

<div>
  <div class="mb-6"><h1 class="text-2xl font-bold text-[#e6edf3]">{(data.frontmatter.title as string) || 'Timeline'}</h1></div>
  <MarkdownRenderer content={data.content} />
</div>
