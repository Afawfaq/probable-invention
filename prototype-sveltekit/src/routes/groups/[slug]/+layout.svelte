<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { LayoutData } from './$types';
  import Sidebar from '$lib/components/Sidebar.svelte';

  let { data, children }: { data: LayoutData; children: Snippet } = $props();
</script>

<div class="max-w-screen-xl mx-auto px-4 py-8 flex gap-6 items-start">
  <Sidebar nav={data.nav} groupName={data.groupName} />
  <div class="flex-1 min-w-0">{@render children()}</div>
</div>
