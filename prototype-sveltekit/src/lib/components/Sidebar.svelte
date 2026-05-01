<script lang="ts">
  import { page } from '$app/stores';
  import type { NavSection } from '$lib/content';

  let { nav, groupName = '' }: { nav: NavSection[]; groupName?: string } = $props();

  let openSections = $state(new Set<string>());
  $effect(() => { openSections = new Set(nav.map((s) => s.title)); });

  function toggle(title: string) {
    const next = new Set(openSections);
    if (next.has(title)) next.delete(title);
    else next.add(title);
    openSections = next;
  }
</script>

<aside class="w-60 shrink-0">
  <div class="sticky top-6">
    {#if groupName}
      <div class="mb-3 px-3 py-2">
        <p class="text-[10px] font-semibold uppercase tracking-widest text-[#8b949e]">APT Group</p>
        <p class="text-sm font-bold text-[#58a6ff] truncate">{groupName}</p>
      </div>
    {/if}
    <nav class="bg-[#161b22] border border-[#30363d] rounded-lg overflow-hidden">
      {#each nav as section, idx}
        <div class={idx > 0 ? 'border-t border-[#30363d]' : ''}>
          <button
            onclick={() => toggle(section.title)}
            class="w-full flex items-center justify-between px-4 py-2.5 text-[11px] font-bold uppercase tracking-widest text-[#8b949e] hover:bg-[#21262d] transition-colors text-left"
          >
            {section.title}
            <span class="text-[10px] text-[#484f58]">{openSections.has(section.title) ? '▼' : '▶'}</span>
          </button>
          {#if openSections.has(section.title)}
            <ul class="pb-1">
              {#each section.items as item}
                {@const isActive = $page.url.pathname === item.href}
                <li>
                  <a
                    href={item.href}
                    class="flex items-center px-4 py-1.5 text-sm transition-colors border-l-2 pl-[14px] {isActive
                      ? 'text-[#58a6ff] bg-[#0d1117] border-[#58a6ff]'
                      : 'text-[#8b949e] hover:text-[#e6edf3] hover:bg-[#21262d] border-transparent'}"
                  >
                    <span class="truncate">{item.label}</span>
                  </a>
                </li>
              {/each}
            </ul>
          {/if}
        </div>
      {/each}
    </nav>
  </div>
</aside>
