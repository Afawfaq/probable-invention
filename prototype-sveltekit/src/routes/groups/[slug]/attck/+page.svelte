<script lang="ts">
  import MarkdownRenderer from '$lib/components/MarkdownRenderer.svelte';
  import type { PageData } from './$types';
  let { data }: { data: PageData } = $props();

  const title = (data.frontmatter.title as string) || 'ATT&CK Matrix';
  const mitreId = data.frontmatter.mitre_group_id as string | undefined;
  const mitreUrl = data.frontmatter.mitre_group_url as string | undefined;
</script>

<svelte:head><title>{title} — APT Research Platform</title></svelte:head>

<div>
  <div class="mb-6 flex flex-wrap items-start justify-between gap-3">
    <div>
      <h1 class="text-2xl font-bold text-[#e6edf3]">{title}</h1>
      {#if mitreId}
        <p class="text-sm text-[#8b949e] mt-1">
          MITRE ATT&CK Group
          {#if mitreUrl}
            <a href={mitreUrl} target="_blank" rel="noopener noreferrer"
               class="text-[#58a6ff] hover:underline font-mono">{mitreId}</a>
          {:else}
            <span class="font-mono text-[#d29922]">{mitreId}</span>
          {/if}
        </p>
      {/if}
    </div>
    <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium
                 bg-[#161b22] text-[#d29922] border border-[#d29922]/30">
      ⚔️ ATT&CK Matrix
    </span>
  </div>
  <MarkdownRenderer content={data.content} />
</div>
