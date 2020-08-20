<script>
  import { createEventDispatcher } from 'svelte'
  import Dropdown from '@/Shared/Dropdown.svelte'

  const dispatch = createEventDispatcher()

  export let maxWidth = 300
  export let value

  $: props = {
    ...$$restProps,
    class: `flex items-center ${$$restProps.class || ''}`,
  }

  function update(event) {
    value = event.target.value
  }
</script>

<div {...props}>
  <div class="flex w-full bg-white shadow rounded">
    <Dropdown
      class="px-4 md:px-6 rounded-l border-r hover:bg-gray-100 focus:border-white focus:shadow-outline focus:z-10"
      placement="bottom-start"
      let:close>
      <div class="flex items-baseline">
        <span class="text-gray-700 hidden md:inline">Filter</span>
        <svg class="w-2 h-2 fill-gray-700 md:ml-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 961.243 599.998">
          <path d="M239.998 239.999L0 0h961.243L721.246 240c-131.999 132-240.28 240-240.624 239.999-.345-.001-108.625-108.001-240.624-240z" />
        </svg>
      </div>
      <div
        slot="dropdown"
        class="mt-2 px-4 py-6 w-screen shadow-xl bg-white rounded"
        style="max-width: {maxWidth}px">
        <slot {close} />
      </div>
    </Dropdown>

    <input
      class="relative w-full px-6 py-3 rounded-r focus:shadow-outline"
      autocomplete="off"
      type="text"
      name="search"
      placeholder="Search…"
      {value}
      on:input={update} />
  </div>

  <button
    class="ml-3 text-sm text-gray-500 hover:text-gray-700 focus:text-indigo-500"
    type="button"
    on:click={() => dispatch('reset')}>
    Reset
  </button>
</div>
