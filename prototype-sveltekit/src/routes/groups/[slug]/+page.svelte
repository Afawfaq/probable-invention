<script lang="ts">
  import MarkdownRenderer from '$lib/components/MarkdownRenderer.svelte';
  import type { PageData } from './$types';
  let { data }: { data: PageData } = $props();
</script>

<svelte:head><title>{data.meta.title || 'Group'} — APT Research Platform</title></svelte:head>

<div>
  <div class="bg-[#161b22] border border-[#30363d] rounded-lg p-5 mb-8">
    <div class="flex flex-wrap items-start justify-between gap-3 mb-4">
      <div>
        <h1 class="text-2xl font-bold text-[#e6edf3] mb-1">{data.meta.title || ''}</h1>
        {#if data.meta.attribution}<p class="text-sm text-[#8b949e]">{data.meta.attribution}</p>{/if}
      </div>
      <div class="flex flex-wrap gap-2">
        {#if data.meta.nation_state}<span class="text-[10px] font-bold uppercase tracking-wide text-[#9e6a03] bg-[#272115] border border-[#5a3e1b] px-2 py-0.5 rounded">🏴 {data.meta.nation_state}</span>{/if}
        {#if data.meta.source_code_available}<span class="text-[10px] font-bold uppercase tracking-wide text-[#3fb950] bg-[#0d2b1e] border border-[#196c2e] px-2 py-0.5 rounded">⚡ Source code available</span>{/if}
      </div>
    </div>
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs mb-4">
      {#if data.meta.active_since}<div><p class="text-[#8b949e] uppercase tracking-wide mb-0.5">Active Since</p><p class="text-[#58a6ff] font-semibold">{data.meta.active_since}</p></div>{/if}
      {#if data.meta.discovered}<div><p class="text-[#8b949e] uppercase tracking-wide mb-0.5">Discovered</p><p class="text-[#e6edf3] font-semibold">{data.meta.discovered}</p></div>{/if}
      {#if data.meta.discovered_by}<div><p class="text-[#8b949e] uppercase tracking-wide mb-0.5">Discovered By</p><p class="text-[#e6edf3]">{data.meta.discovered_by}</p></div>{/if}
      {#if data.meta.mitre_group_id}<div><p class="text-[#8b949e] uppercase tracking-wide mb-0.5">MITRE ID</p><p class="font-mono text-[#d29922]">{data.meta.mitre_group_id}</p></div>{/if}
    </div>
    {#if data.meta.tags && data.meta.tags.length > 0}
      <div class="flex flex-wrap gap-1.5">
        {#each data.meta.tags as tag}<span class="text-[10px] text-[#8b949e] bg-[#21262d] border border-[#30363d] px-1.5 py-0.5 rounded">#{tag}</span>{/each}
      </div>
    {/if}
  </div>
  <MarkdownRenderer content={data.content} />
</div>

