<script lang="ts">
  import '../app.css';
  import type { Snippet } from 'svelte';

  let { children }: { children: Snippet } = $props();
</script>

<div class="min-h-screen flex flex-col bg-[#0d1117] text-[#e6edf3]">
  <header class="sticky top-0 z-50 bg-[#161b22] border-b border-[#30363d]">
    <div class="max-w-screen-xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
      <a href="/" class="flex items-center gap-2.5 shrink-0">
        <span class="text-[#f85149] text-xl" aria-hidden="true">⚡</span>
        <span class="font-bold text-[#e6edf3] tracking-tight">APT Research Platform</span>
        <span class="hidden sm:inline-block text-[10px] font-semibold uppercase tracking-widest text-[#8b949e] bg-[#21262d] border border-[#30363d] px-1.5 py-0.5 rounded">Beta</span>
      </a>
      <nav class="flex items-center gap-1 text-sm">
        <a href="/" class="px-3 py-1.5 rounded text-[#8b949e] hover:text-[#e6edf3] hover:bg-[#21262d] transition-colors">Groups</a>
        <a href="/graph" class="px-3 py-1.5 rounded text-[#8b949e] hover:text-[#e6edf3] hover:bg-[#21262d] transition-colors">Graph</a>
        <a href="https://attack.mitre.org/" target="_blank" rel="noopener noreferrer" class="px-3 py-1.5 rounded text-[#8b949e] hover:text-[#e6edf3] hover:bg-[#21262d] transition-colors">MITRE ATT&CK ↗</a>
      </nav>
    </div>
  </header>
  <main class="flex-1">{@render children()}</main>
  <footer class="border-t border-[#30363d] bg-[#161b22] mt-auto">
    <div class="max-w-screen-xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#8b949e]">
      <p>APT Research Platform — ADHD-friendly threat intelligence. For educational purposes only.</p>
      <p>Data sourced from public threat intelligence reports. No sensitive material is hosted.</p>
    </div>
  </footer>
</div>
