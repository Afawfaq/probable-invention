<script lang="ts">
  import type { PageData } from './$types';
  let { data }: { data: PageData } = $props();
</script>

<svelte:head><title>APT Research Platform</title></svelte:head>

<div class="max-w-screen-xl mx-auto px-4 py-12">
  <section class="mb-14">
    <div class="flex items-center gap-2 mb-4">
      <span class="text-[10px] font-bold uppercase tracking-widest text-[#58a6ff] bg-[#0d2d6b] border border-[#1f5eb8] px-2 py-0.5 rounded">ADHD-Friendly</span>
      <span class="text-[10px] font-bold uppercase tracking-widest text-[#3fb950] bg-[#0d2b1e] border border-[#196c2e] px-2 py-0.5 rounded">Threat Intelligence</span>
    </div>
    <h1 class="text-4xl sm:text-5xl font-extrabold text-[#e6edf3] mb-4 leading-tight">
      APT Research <span class="text-[#58a6ff]">Platform</span>
    </h1>
    <p class="text-lg text-[#8b949e] max-w-2xl mb-6 leading-relaxed">
      Structured, readable threat intelligence on Advanced Persistent Threat groups. Designed for focus — clear visual hierarchy, colour-coded categories, and collapsible sections to reduce cognitive load.
    </p>
    <div class="flex flex-wrap gap-2 text-sm">
      {#each ['🏗️ Structured navigation','🎨 Colour-coded categories','📦 Collapsible sections','🔍 Source-linked content','🧠 MITRE ATT&CK mapping'] as f}
        <span class="flex items-center gap-1.5 bg-[#161b22] border border-[#30363d] px-3 py-1 rounded-full text-[#8b949e]">{f}</span>
      {/each}
    </div>
  </section>

  <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
    {#each [
      {value: String(data.groups.length), label: 'APT Groups'},
      {value: '30+', label: 'Content Files'},
      {value: '3', label: 'Content Categories'},
      {value: '100%', label: 'Open Source'},
    ] as s}
      <div class="bg-[#161b22] border border-[#30363d] rounded-lg px-4 py-3 text-center">
        <p class="text-2xl font-bold text-[#58a6ff]">{s.value}</p>
        <p class="text-xs text-[#8b949e] uppercase tracking-wide mt-0.5">{s.label}</p>
      </div>
    {/each}
  </div>

  <section>
    <div class="flex items-center justify-between mb-5">
      <h2 class="text-xl font-bold text-[#e6edf3]">APT Groups</h2>
      <span class="text-sm text-[#8b949e]">{data.groups.length} group{data.groups.length !== 1 ? 's' : ''}</span>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {#each data.groups as { slug, meta }}
        <a href="/groups/{slug}" class="block bg-[#161b22] border border-[#30363d] rounded-lg p-5 hover:border-[#58a6ff] transition-colors">
          <div class="flex items-start justify-between gap-2 mb-3">
            <h3 class="text-lg font-bold text-[#e6edf3]">{meta.title || slug}</h3>
            {#if meta.nation_state}
              <span class="shrink-0 text-[10px] font-bold uppercase tracking-wide text-[#9e6a03] bg-[#272115] border border-[#5a3e1b] px-2 py-0.5 rounded">🏴 {meta.nation_state}</span>
            {/if}
          </div>
          {#if meta.attribution}<p class="text-sm text-[#8b949e] mb-3 leading-relaxed">{meta.attribution}</p>{/if}
          <div class="flex flex-wrap gap-1.5 mb-3">
            {#if meta.active_since}<span class="text-xs text-[#58a6ff] bg-[#0d1d3d] border border-[#1f3e7a] px-2 py-0.5 rounded">Since {meta.active_since}</span>{/if}
            {#if meta.source_code_available}<span class="text-xs text-[#3fb950] bg-[#0d2b1e] border border-[#196c2e] px-2 py-0.5 rounded">⚡ Source code</span>{/if}
          </div>
          {#if meta.tags && meta.tags.length > 0}
            <div class="flex flex-wrap gap-1">
              {#each meta.tags.slice(0,5) as tag}
                <span class="text-[10px] text-[#8b949e] bg-[#21262d] border border-[#30363d] px-1.5 py-0.5 rounded">#{tag}</span>
              {/each}
            </div>
          {/if}
        </a>
      {/each}
    </div>
  </section>
</div>
