<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import type { GraphData } from '$lib/graph';

  let { data }: { data: GraphData } = $props();

  let container: HTMLDivElement | undefined = $state();
  let cyInstance: import('cytoscape').Core | null = null;

  onMount(async () => {
    if (!container) return;

    const { default: cytoscape } = await import('cytoscape');

    const cy = cytoscape({
      container,
      elements: [
        ...data.nodes.map((n) => ({ data: { ...n } })),
        ...data.edges.map((e) => ({ data: { ...e } })),
      ],
      style: [
        {
          selector: 'node[type="group"]',
          style: {
            'background-color': '#1f6feb',
            label: 'data(label)',
            color: '#e6edf3',
            'text-valign': 'center',
            'text-halign': 'center',
            'font-size': '13px',
            'font-weight': 'bold',
            width: '130px',
            height: '54px',
            shape: 'roundrectangle',
            'text-wrap': 'wrap',
            'text-max-width': '118px',
            'border-width': '2px',
            'border-color': '#388bfd',
          },
        },
        {
          selector: 'node[type="malware"]',
          style: {
            'background-color': '#6e1c1c',
            label: 'data(label)',
            color: '#ffa198',
            'text-valign': 'center',
            'text-halign': 'center',
            'font-size': '11px',
            width: '108px',
            height: '42px',
            shape: 'roundrectangle',
            'text-wrap': 'wrap',
            'text-max-width': '98px',
            'border-width': '1px',
            'border-color': '#da3633',
          },
        },
        {
          selector: 'node[type="ttp"]',
          style: {
            'background-color': '#2d2000',
            label: 'data(label)',
            color: '#e3b341',
            'text-valign': 'center',
            'text-halign': 'center',
            'font-size': '10px',
            width: '100px',
            height: '38px',
            shape: 'roundrectangle',
            'text-wrap': 'wrap',
            'text-max-width': '90px',
            'border-width': '1px',
            'border-color': '#9e6a03',
          },
        },
        {
          selector: 'node[type="external"]',
          style: {
            'background-color': '#161b22',
            label: 'data(label)',
            color: '#8b949e',
            'text-valign': 'center',
            'text-halign': 'center',
            'font-size': '10px',
            width: '100px',
            height: '38px',
            shape: 'roundrectangle',
            'text-wrap': 'wrap',
            'text-max-width': '90px',
            'border-width': '2px',
            'border-color': '#484f58',
            'border-style': 'dashed',
          },
        },
        {
          selector: 'node:selected',
          style: { 'border-color': '#e6edf3', 'border-width': '3px' },
        },
        {
          selector: 'node.hover',
          style: { 'border-color': '#ffffff', 'border-width': '2px' },
        },
        {
          selector: 'edge[type="uses"]',
          style: {
            'line-color': '#3fb950',
            'target-arrow-color': '#3fb950',
            'target-arrow-shape': 'triangle',
            'curve-style': 'bezier',
            label: 'data(label)',
            'font-size': '9px',
            color: '#3fb950',
            'text-background-color': '#0d1117',
            'text-background-opacity': 0.85,
            'text-background-padding': '2px',
            width: 1.5,
          },
        },
        {
          selector: 'edge[type="employs"]',
          style: {
            'line-color': '#58a6ff',
            'target-arrow-color': '#58a6ff',
            'target-arrow-shape': 'triangle',
            'line-style': 'dashed',
            'curve-style': 'bezier',
            label: 'data(label)',
            'font-size': '9px',
            color: '#58a6ff',
            'text-background-color': '#0d1117',
            'text-background-opacity': 0.85,
            'text-background-padding': '2px',
            width: 1.5,
          },
        },
        {
          selector: 'edge[type="shared_technique"]',
          style: {
            'line-color': '#d29922',
            'target-arrow-shape': 'none',
            'line-style': 'dotted',
            'curve-style': 'bezier',
            label: 'data(label)',
            'font-size': '9px',
            color: '#d29922',
            'text-background-color': '#0d1117',
            'text-background-opacity': 0.85,
            'text-background-padding': '2px',
            width: 2.5,
          },
        },
        {
          selector: 'edge[type="related"]',
          style: {
            'line-color': '#f0883e',
            'target-arrow-color': '#f0883e',
            'target-arrow-shape': 'triangle',
            'curve-style': 'bezier',
            label: 'data(label)',
            'font-size': '9px',
            color: '#f0883e',
            'text-background-color': '#0d1117',
            'text-background-opacity': 0.85,
            'text-background-padding': '2px',
            width: 1.5,
          },
        },
        {
          selector: 'edge[type="cross_group"]',
          style: {
            'line-color': '#bc8cff',
            'target-arrow-color': '#bc8cff',
            'target-arrow-shape': 'triangle',
            'curve-style': 'bezier',
            label: 'data(label)',
            'font-size': '9px',
            color: '#bc8cff',
            'text-background-color': '#0d1117',
            'text-background-opacity': 0.85,
            'text-background-padding': '2px',
            width: 2,
          },
        },
      ],
      layout: {
        name: 'cose',
        animate: false,
        fit: true,
        padding: 60,
        nodeRepulsion: () => 12000,
        nodeOverlap: 30,
        idealEdgeLength: () => 140,
        edgeElasticity: () => 80,
        nestingFactor: 1.2,
        gravity: 60,
        numIter: 1200,
        initialTemp: 250,
        coolingFactor: 0.95,
        minTemp: 1.0,
      },
      minZoom: 0.3,
      maxZoom: 3,
      wheelSensitivity: 0.3,
    });

    cyInstance = cy;

    cy.on('mouseover', 'node', (e) => {
      e.target.addClass('hover');
      if (container) container.style.cursor = e.target.data('href') ? 'pointer' : 'default';
    });
    cy.on('mouseout', 'node', (e) => {
      e.target.removeClass('hover');
      if (container) container.style.cursor = 'default';
    });
    cy.on('tap', 'node', (e) => {
      const href = e.target.data('href') as string | undefined;
      if (href) goto(href);
    });

    return () => {
      cy.destroy();
      cyInstance = null;
    };
  });

  function resetView() {
    cyInstance?.fit(undefined, 60);
  }
</script>

<div class="relative w-full">
  <div
    bind:this={container}
    class="w-full rounded-lg border border-[#30363d] bg-[#0d1117]"
    style="height: 660px;"
  ></div>
  <button
    onclick={resetView}
    class="absolute top-3 right-3 text-xs text-[#8b949e] bg-[#161b22] border border-[#30363d] px-2.5 py-1 rounded hover:text-[#e6edf3] hover:border-[#8b949e] transition-colors"
  >
    ⟲ Reset view
  </button>
</div>
