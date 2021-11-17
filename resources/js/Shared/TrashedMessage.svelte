<script>
  import { createEventDispatcher } from 'svelte'
  import Icon from '@/Shared/Icon.svelte'

  const dispatch = createEventDispatcher()

  function restore() {
    dispatch('restore')
  }
</script>

<div class="p-4 bg-yellow-300 rounded flex items-center justify-between max-w-3xl">
  <div class="flex items-center">
    <Icon name="trash" class="flex-shrink-0 w-4 h-4 fill-yellow-800 mr-2" />
    <div class="text-sm font-medium text-yellow-800">
      <slot />
    </div>
  </div>
  <button
    class="text-sm text-yellow-800 hover:underline"
    tabindex="-1"
    type="button"
    on:click={restore}>
    Restore
  </button>
</div>
