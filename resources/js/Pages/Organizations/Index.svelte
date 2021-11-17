<script context="module">
  import Layout, { title } from '@/Shared/Layout.svelte'
  export const layout = Layout
</script>

<script>
  import { inertia, page } from '@inertiajs/inertia-svelte'
  import { route } from '@/utils'
  import Icon from '@/Shared/Icon.svelte'
  import Pagination from '@/Shared/Pagination.svelte'
  import SearchFilter from '@/Shared/SearchFilter.svelte'

  export let organizations = []

  $title = 'Organizations'

  let filters = {
    trashed: $page.props.filters.trashed,
  }
</script>

<h1 class="mb-8 font-bold text-3xl">Organizations</h1>
<div class="mb-6 flex justify-between items-center">
  <SearchFilter class="w-full max-w-md mr-4" bind:filters>
    <label for="trashed" class="block text-gray-700">Trashed:</label>
    <select id="trashed" class="mt-1 w-full form-select" bind:value={filters.trashed}>
      <option value={null} />
      <option value="with">With Trashed</option>
      <option value="only">Only Trashed</option>
    </select>
  </SearchFilter>
  <a use:inertia href={route('organizations.create')} class="btn-indigo">
    <span>Create</span>
    <span class="hidden md:inline">Organization</span>
  </a>
</div>
<div class="bg-white rounded-md shadow overflow-x-auto">
  <table class="w-full whitespace-nowrap">
    <tr class="text-left font-bold">
      <th class="px-6 pt-6 pb-4">Name</th>
      <th class="px-6 pt-6 pb-4">City</th>
      <th class="px-6 pt-6 pb-4" colspan="2">Phone</th>
    </tr>
    {#each organizations.data as organization (organization.id)}
      <tr class="hover:bg-gray-100 focus-within:bg-gray-100">
        <td class="border-t">
          <a
            use:inertia
            href={route('organizations.edit', organization.id)}
            class="px-6 py-4 flex items-center focus:text-indigo-500">
            {organization.name}
            {#if organization.deleted_at}
              <Icon name="trash" class="flex-shrink-0 w-3 h-3 fill-gray-400 ml-2" />
            {/if}
          </a>
        </td>
        <td class="border-t">
          <a
            use:inertia
            href={route('organizations.edit', organization.id)}
            class="px-6 py-4 flex items-center"
            tabindex="-1">
            {organization.city || ''}
          </a>
        </td>
        <td class="border-t">
          <a
            use:inertia
            href={route('organizations.edit', organization.id)}
            class="px-6 py-4 flex items-center"
            tabindex="-1">
            {organization.phone || ''}
          </a>
        </td>
        <td class="border-t w-px">
          <a
            use:inertia
            href={route('organizations.edit', organization.id)}
            class="px-4 flex items-center"
            tabindex="-1">
            <Icon name="cheveron-right" class="block w-6 h-6 fill-gray-400" />
          </a>
        </td>
      </tr>
    {/each}

    {#if organizations.data.length === 0}
      <tr>
        <td class="border-t px-6 py-4" colspan="4">No organizations found.</td>
      </tr>
    {/if}
  </table>
</div>
<Pagination class="mt-6" links={organizations.links} />
