<script context="module">
  import Layout, { title } from '@/Shared/Layout.svelte'
  export const layout = Layout
</script>

<script>
  import { inertia, page } from '@inertiajs/svelte'
  import Icon from '@/Shared/Icon.svelte'
  import Pagination from '@/Shared/Pagination.svelte'
  import SearchFilter from '@/Shared/SearchFilter.svelte'

  export let contacts = []

  $title = 'Contacts'

  let filters = {
    trashed: $page.props.filters.trashed,
  }
</script>

<h1 class="mb-8 text-3xl font-bold">Contacts</h1>
<div class="mb-6 flex items-center justify-between">
  <SearchFilter class="mr-4 w-full max-w-md" bind:filters>
    <label for="trashed" class="block text-gray-700">Trashed:</label>
    <select id="trashed" class="form-select mt-1 w-full" bind:value={filters.trashed}>
      <option value={null} />
      <option value="with">With Trashed</option>
      <option value="only">Only Trashed</option>
    </select>
  </SearchFilter>
  <a use:inertia href="/contacts/create" class="btn-indigo">
    <span>Create</span>
    <span class="hidden md:inline">&nbsp;Contact</span>
  </a>
</div>
<div class="overflow-x-auto rounded-md bg-white shadow">
  <table class="w-full whitespace-nowrap">
    <tr class="text-left font-bold">
      <th class="px-6 pb-4 pt-6">Name</th>
      <th class="px-6 pb-4 pt-6">Organization</th>
      <th class="px-6 pb-4 pt-6">City</th>
      <th class="px-6 pb-4 pt-6" colspan="2">Phone</th>
    </tr>
    {#each contacts.data as contact (contact.id)}
      <tr class="focus-within:bg-gray-100 hover:bg-gray-100">
        <td class="border-t">
          <a use:inertia href="/contacts/{contact.id}/edit" class="flex items-center px-6 py-4 focus:text-indigo-500">
            {contact.name}
            {#if contact.deleted_at}
              <Icon name="trash" class="ml-2 h-3 w-3 shrink-0 fill-gray-400" />
            {/if}
          </a>
        </td>
        <td class="border-t">
          <a use:inertia href="/contacts/{contact.id}/edit" class="flex items-center px-6 py-4" tabindex="-1">
            {#if contact.organization}{contact.organization.name}{/if}
          </a>
        </td>
        <td class="border-t">
          <a use:inertia href="/contacts/{contact.id}/edit" class="flex items-center px-6 py-4" tabindex="-1">
            {contact.city || ''}
          </a>
        </td>
        <td class="border-t">
          <a use:inertia href="/contacts/{contact.id}/edit" class="flex items-center px-6 py-4" tabindex="-1">
            {contact.phone || ''}
          </a>
        </td>
        <td class="w-px border-t">
          <a use:inertia href="/contacts/{contact.id}/edit" class="flex items-center px-4" tabindex="-1">
            <Icon name="cheveron-right" class="block h-6 w-6 fill-gray-400" />
          </a>
        </td>
      </tr>
    {/each}

    {#if contacts.data.length === 0}
      <tr>
        <td class="border-t px-6 py-4" colspan="4">No contacts found.</td>
      </tr>
    {/if}
  </table>
</div>
<Pagination class="mt-6" links={contacts.links} />
