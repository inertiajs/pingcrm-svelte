<script>
  import { createEventDispatcher } from 'svelte'
  import Icon from '@/Shared/Icon.svelte'

  const dispatch = createEventDispatcher()

  function restore() {
    dispatch('restore')
  }
</script>

<div class="flex max-w-3xl items-center justify-between rounded bg-yellow-400 p-4">
  <div class="flex items-center">
    <Icon name="trash" class="mr-2 h-4 w-4 shrink-0 fill-yellow-800" />
    <div class="text-sm font-medium text-yellow-800">
      <slot />
    </div>
  </div>
  <button class="text-sm text-yellow-800 hover:underline" tabindex="-1" type="button" on:click={restore}> Restore </button>
</div>
