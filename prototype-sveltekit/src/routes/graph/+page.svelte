<script lang="ts">
  import GraphView from '$lib/components/GraphView.svelte';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();

  const { graphData } = data;
  const nodeCount = graphData.nodes.length;
  const edgeCount = graphData.edges.length;
  const groupCount = graphData.nodes.filter((n) => n.type === 'group').length;
  const malwareCount = graphData.nodes.filter((n) => n.type === 'malware').length;
  const ttpCount = graphData.nodes.filter((n) => n.type === 'ttp').length;

  const nodeLegend = [
    { color: '#1f6feb', border: '#388bfd', label: 'APT Group', dashed: false },
    { color: '#6e1c1c', border: '#da3633', label: 'Malware / Implant', dashed: false },
    { color: '#2d2000', border: '#9e6a03', label: 'TTP', dashed: false },
    { color: '#161b22', border: '#484f58', label: 'External entity', dashed: true },
  ];

  const edgeLegend = [
    { color: '#3fb950', label: 'uses (group → malware)', style: 'solid' },
    { color: '#58a6ff', label: 'employs (group → TTP)', style: 'dashed' },
    { color: '#d29922', label: 'shared MITRE techniques', style: 'dotted' },
    { color: '#f0883e', label: 'related / shares zero-days', style: 'solid' },
    { color: '#bc8cff', label: 'cross-group (hijacked C2)', style: 'solid' },
  ];
</script>

<svelte:head><title>Relationship Graph — APT Research Platform</title></svelte:head>

<div class="max-w-screen-xl mx-auto px-4 py-8">
  <!-- Header -->
  <div class="mb-6">
    <h1 class="text-2xl font-bold text-[#e6edf3] mb-1">Relationship Graph</h1>
    <p class="text-sm text-[#8b949e]">
      Visual map of APT groups, their tools, TTPs, and cross-group connections. Click any node to
      navigate to its page.
    </p>
  </div>

  <!-- Stats row -->
  <div class="flex flex-wrap gap-3 mb-5 text-xs">
    {#each [
      { value: groupCount, label: 'Groups', color: '#388bfd' },
      { value: malwareCount, label: 'Malware', color: '#da3633' },
      { value: ttpCount, label: 'TTPs', color: '#9e6a03' },
      { value: nodeCount, label: 'Total nodes', color: '#8b949e' },
      { value: edgeCount, label: 'Edges', color: '#8b949e' },
    ] as s}
      <div class="bg-[#161b22] border border-[#30363d] rounded px-3 py-1.5 flex items-center gap-1.5">
        <span class="font-bold" style:color={s.color}>{s.value}</span>
        <span class="text-[#8b949e]">{s.label}</span>
      </div>
    {/each}
  </div>

  <!-- Graph canvas -->
  <div class="mb-6">
    <GraphView data={graphData} />
    <p class="text-xs text-[#484f58] mt-2 text-center">
      Scroll to zoom · Drag to pan · Click a node to navigate
    </p>
  </div>

  <!-- Legend -->
  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
    <!-- Node types -->
    <div class="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
      <p class="text-xs font-bold text-[#8b949e] uppercase tracking-wide mb-3">Node types</p>
      <div class="space-y-2">
        {#each nodeLegend as n}
          <div class="flex items-center gap-2.5">
            <span
              class="inline-block w-8 h-5 rounded flex-shrink-0"
              style:background-color={n.color}
              style:border="{n.dashed ? '2px dashed' : '1px solid'} {n.border}"
            ></span>
            <span class="text-xs text-[#cdd9e5]">{n.label}</span>
          </div>
        {/each}
      </div>
    </div>

    <!-- Edge types -->
    <div class="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
      <p class="text-xs font-bold text-[#8b949e] uppercase tracking-wide mb-3">Edge types</p>
      <div class="space-y-2">
        {#each edgeLegend as e}
          <div class="flex items-center gap-2.5">
            <span
              class="inline-block w-8 flex-shrink-0"
              style="height:2px; background-color:{e.style === 'solid' ? e.color : 'transparent'};
                     border-top: 2px {e.style} {e.color};"
            ></span>
            <span class="text-xs text-[#cdd9e5]">{e.label}</span>
          </div>
        {/each}
      </div>
    </div>
  </div>
</div>
