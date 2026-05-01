<script lang="ts">
  import { marked } from 'marked';

  let { content }: { content: string } = $props();

  const html = $derived(marked(content, { gfm: true }) as string);
</script>

<article class="prose-apt min-w-0">
  {@html html}
</article>

<style>
  .prose-apt :global(h1) { font-size:1.875rem; font-weight:700; color:#e6edf3; border-bottom:1px solid #30363d; padding-bottom:0.75rem; margin-bottom:1.5rem; margin-top:0; }
  .prose-apt :global(h2) { font-size:1.5rem; font-weight:700; color:#e6edf3; border-bottom:1px solid #30363d; padding-bottom:0.5rem; margin-bottom:1rem; margin-top:2rem; }
  .prose-apt :global(h3) { font-size:1.25rem; font-weight:600; color:#cdd9e5; margin-bottom:0.75rem; margin-top:1.5rem; }
  .prose-apt :global(h4) { font-size:1.125rem; font-weight:600; color:#cdd9e5; margin-bottom:0.5rem; margin-top:1.25rem; }
  .prose-apt :global(p) { color:#cdd9e5; line-height:1.7; margin-bottom:1rem; }
  .prose-apt :global(a) { color:#58a6ff; text-decoration:none; }
  .prose-apt :global(a:hover) { text-decoration:underline; color:#79c0ff; }
  .prose-apt :global(ul) { list-style-type:disc; padding-left:1.5rem; color:#cdd9e5; margin-bottom:1rem; }
  .prose-apt :global(ol) { list-style-type:decimal; padding-left:1.5rem; color:#cdd9e5; margin-bottom:1rem; }
  .prose-apt :global(li) { margin-bottom:0.25rem; line-height:1.7; }
  .prose-apt :global(blockquote) { border-left:4px solid #58a6ff; background:#161b22; padding:0.75rem 1rem; margin-bottom:1rem; border-radius:0 0.375rem 0.375rem 0; color:#8b949e; font-style:italic; }
  .prose-apt :global(pre) { background:#161b22; border:1px solid #30363d; border-radius:0.5rem; padding:1rem; margin-bottom:1rem; overflow-x:auto; font-size:0.875rem; line-height:1.6; }
  .prose-apt :global(code) { font-family:ui-monospace,'Cascadia Code',monospace; font-size:0.875em; }
  .prose-apt :global(pre code) { color:#e6edf3; background:none; padding:0; border:none; }
  .prose-apt :global(:not(pre) > code) { background:#161b22; color:#f0883e; padding:0.125rem 0.375rem; border-radius:0.25rem; border:1px solid #30363d; }
  .prose-apt :global(table) { width:100%; border-collapse:collapse; font-size:0.875rem; margin-bottom:1.5rem; border:1px solid #30363d; border-radius:0.5rem; overflow:hidden; }
  .prose-apt :global(thead) { background:#161b22; border-bottom:1px solid #30363d; }
  .prose-apt :global(th) { padding:0.625rem 1rem; text-align:left; font-size:0.75rem; font-weight:700; color:#8b949e; text-transform:uppercase; letter-spacing:0.05em; }
  .prose-apt :global(td) { padding:0.625rem 1rem; color:#cdd9e5; border-bottom:1px solid #30363d; }
  .prose-apt :global(tr:last-child td) { border-bottom:none; }
  .prose-apt :global(tr:hover td) { background:#161b22; }
  .prose-apt :global(hr) { border-color:#30363d; margin:2rem 0; }
  .prose-apt :global(strong) { color:#e6edf3; font-weight:600; }
  .prose-apt :global(em) { color:#cdd9e5; }
</style>
