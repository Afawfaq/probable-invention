<script lang="ts">
  import MarkdownRenderer from '$lib/components/MarkdownRenderer.svelte';
  import type { PageData } from './$types';
  let { data }: { data: PageData } = $props();

  const sectionLabels: Record<string, string> = {
    malware: 'Malware Arsenal',
    'shadowbrokers-dump': 'ShadowBrokers Dump',
    ttps: 'TTPs',
  };
  const sectionColors: Record<string, string> = {
    malware: 'text-[#f85149] bg-[#2d1a1e] border-[#5a2020]',
    'shadowbrokers-dump': 'text-[#d29922] bg-[#272115] border-[#5a3e1b]',
    ttps: 'text-[#58a6ff] bg-[#0d2d6b] border-[#1f5eb8]',
  };
</script>

<svelte:head><title>{(data.frontmatter.title as string) || data.item} — APT Research Platform</title></svelte:head>

<div>
  <div class="flex items-center gap-2 mb-5 text-sm text-[#8b949e]">
    <span class="text-[11px] font-bold uppercase tracking-widest border px-2 py-0.5 rounded {sectionColors[data.section] || 'text-[#8b949e] bg-[#21262d] border-[#30363d]'}">
      {sectionLabels[data.section] || data.section}
    </span>
    <span class="text-[#484f58]">/</span>
    <span class="text-[#e6edf3]">{(data.frontmatter.title as string) || data.item}</span>
  </div>

  <div class="bg-[#161b22] border border-[#30363d] rounded-lg p-5 mb-8">
    <div class="flex flex-wrap items-start justify-between gap-3 mb-3">
      <h1 class="text-2xl font-bold text-[#e6edf3]">{(data.frontmatter.title as string) || data.item}</h1>
      {#if data.section === 'malware'}
        <span class="text-[10px] font-bold uppercase tracking-wide text-[#f85149] bg-[#2d1a1e] border border-[#5a2020] px-2 py-0.5 rounded">🦠 Malware</span>
      {:else if data.section === 'shadowbrokers-dump'}
        <span class="text-[10px] font-bold uppercase tracking-wide text-[#d29922] bg-[#272115] border border-[#5a3e1b] px-2 py-0.5 rounded">⚠️ ShadowBrokers Dump</span>
      {:else if data.section === 'ttps'}
        <span class="text-[10px] font-bold uppercase tracking-wide text-[#58a6ff] bg-[#0d2d6b] border border-[#1f5eb8] px-2 py-0.5 rounded">⚔️ TTP</span>
      {/if}
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
      {#if data.frontmatter.platform}<div><p class="text-[#8b949e] uppercase tracking-wide mb-0.5">Platform</p><p class="text-[#e6edf3]">{data.frontmatter.platform as string}</p></div>{/if}
      {#if data.frontmatter.category}<div><p class="text-[#8b949e] uppercase tracking-wide mb-0.5">Category</p><p class="text-[#e6edf3] capitalize">{data.frontmatter.category as string}</p></div>{/if}
      {#if typeof data.frontmatter.source_available === 'boolean'}
        <div><p class="text-[#8b949e] uppercase tracking-wide mb-0.5">Source Available</p><p class="{data.frontmatter.source_available ? 'text-[#3fb950]' : 'text-[#f85149]'}">{data.frontmatter.source_available ? '✓ Yes' : '✗ No'}</p></div>
      {/if}
    </div>
    {#if data.frontmatter.mitre_techniques && Array.isArray(data.frontmatter.mitre_techniques) && (data.frontmatter.mitre_techniques as string[]).length > 0}
      <div class="mt-3 pt-3 border-t border-[#30363d]">
        <p class="text-[#8b949e] text-xs uppercase tracking-wide mb-1.5">MITRE Techniques</p>
        <div class="flex flex-wrap gap-1.5">
          {#each data.frontmatter.mitre_techniques as t}
            <span class="text-[10px] font-mono text-[#d29922] bg-[#272115] border border-[#5a3e1b] px-2 py-0.5 rounded">{(t as string).split(/\s+/)[0]}</span>
          {/each}
        </div>
      </div>
    {/if}
    {#if data.frontmatter.tags && Array.isArray(data.frontmatter.tags) && (data.frontmatter.tags as string[]).length > 0}
      <div class="mt-3 pt-3 border-t border-[#30363d]">
        <div class="flex flex-wrap gap-1.5">
          {#each data.frontmatter.tags as tag}
            <span class="text-[10px] text-[#8b949e] bg-[#21262d] border border-[#30363d] px-1.5 py-0.5 rounded">#{tag as string}</span>
          {/each}
        </div>
      </div>
    {/if}
  </div>

  <MarkdownRenderer content={data.content} />
</div>
