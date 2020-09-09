<script>
  import { inertia } from '@inertiajs/inertia-svelte'

  export let links = []
</script>

<div class="mt-6 -mb-1 flex flex-wrap">
  {#each links as link (link.label)}
    {#if link.url === null}
      <div
        class="mr-1 mb-1 px-4 py-3 text-sm border rounded text-gray-400"
        class:ml-auto={link.label === 'Next'}>
        {link.label}
      </div>
    {:else}
      <a
        use:inertia
        href={link.url}
        class={`mr-1 mb-1 px-4 py-3 text-sm border rounded hover:bg-white focus:border-indigo-500 focus:text-indigo-500 ${link.active && 'bg-white'} ${link.label === 'Next' && 'ml-auto'}`}>
        {link.label}
      </a>
    {/if}
  {/each}
</div>
