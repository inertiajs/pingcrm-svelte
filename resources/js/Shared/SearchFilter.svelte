<script>
  import { router } from '@inertiajs/core'
  import { page } from '@inertiajs/svelte'
  import pickBy from 'lodash/pickBy'
  import debounce from 'lodash/debounce'
  import Dropdown from '@/Shared/Dropdown.svelte'

  export let filters = {}
  export let maxWidth = 300

  $: props = {
    ...$$restProps,
    class: `flex items-center ${$$restProps.class || ''}`,
  }

  let readyToSearch = false
  let form = {
    search: $page.props.filters.search,
  }

  $: if (filters) {
    form = { ...form, ...filters }
  }

  $: search(form)

  function reset() {
    Object.keys(form).forEach((key) => (form[key] = null))
    Object.keys(filters).forEach((key) => (filters[key] = null))
  }

  const search = debounce((form) => {
    if (!readyToSearch) {
      readyToSearch = true
      return
    }

    router.get(window.location.href, pickBy(form), { preserveState: true })
  }, 150)
</script>

<div {...props}>
  <div class="flex w-full rounded bg-white shadow">
    <Dropdown class="rounded-l border-r px-4 hover:bg-gray-100 focus:z-10 focus:border-white focus:ring md:px-6" placement="bottom-start" autoclose={false}>
      <div class="flex items-baseline">
        <span class="hidden text-gray-700 md:inline">Filter</span>
        <svg class="h-2 w-2 fill-gray-700 md:ml-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 961.243 599.998">
          <path
            d="M239.998 239.999L0 0h961.243L721.246 240c-131.999 132-240.28 240-240.624
            239.999-.345-.001-108.625-108.001-240.624-240z"
          />
        </svg>
      </div>
      <div slot="dropdown" class="mt-2 w-screen rounded bg-white px-4 py-6 shadow-xl" style="max-width: {maxWidth}px">
        <slot />
      </div>
    </Dropdown>

    <input class="focus:shadow-outline relative w-full rounded-r px-6 py-3" autocomplete="off" type="text" name="search" placeholder="Search…" bind:value={form.search} />
  </div>

  <button class="ml-3 text-sm text-gray-500 hover:text-gray-700 focus:text-indigo-500" type="button" on:click={reset}> Reset </button>
</div>
