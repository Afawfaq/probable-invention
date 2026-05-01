<script lang="ts">
  import { page } from '$app/stores';
</script>

<div class="max-w-screen-xl mx-auto px-4 py-20 text-center">
  <p class="text-6xl font-bold text-[#f85149] mb-4">{$page.status}</p>
  <p class="text-xl text-[#8b949e]">{$page.error?.message || 'Page not found'}</p>
  <a href="/" class="mt-8 inline-block text-[#58a6ff] hover:underline">← Back to Groups</a>
</div>
