<script context="module">
  import Layout, { title } from '@/Shared/Layout.svelte'
  export const layout = Layout
</script>

<script>
  import { inertia, router } from '@inertiajs/svelte'
  import isEqual from 'lodash/isEqual'
  import mapValues from 'lodash/mapValues'
  import pickBy from 'lodash/pickBy'
  import throttle from 'lodash/throttle'
  import Icon from '@/Shared/Icon.svelte'
  import SearchFilter from '@/Shared/SearchFilter.svelte'

  export let filters = {}
  export let users = []

  $title = 'Users'

  let form = {
    role: filters.role,
    search: filters.search,
    trashed: filters.trashed,
  }

  const search = throttle((form) => {
    router.get('/users', pickBy(form), { preserveState: true })
  }, 150)

  $: if (!isEqual(filters, form)) {
    search(form)
  }

  function reset() {
    form = mapValues(form, () => null)
  }
</script>

<h1 class="mb-8 text-3xl font-bold">Users</h1>
<div class="mb-6 flex items-center justify-between">
  <SearchFilter class="mr-4 w-full max-w-md" bind:value={form.search} on:reset={reset}>
    <label for="role" class="block text-gray-700">Role:</label>
    <select id="role" class="form-select mt-1 w-full" bind:value={form.role}>
      <option value={null} />
      <option value="user">User</option>
      <option value="owner">Owner</option>
    </select>
    <label for="trashed" class="mt-4 block text-gray-700">Trashed:</label>
    <select id="trashed" class="form-select mt-1 w-full" bind:value={form.trashed}>
      <option value={null} />
      <option value="with">With Trashed</option>
      <option value="only">Only Trashed</option>
    </select>
  </SearchFilter>
  <a use:inertia href="/users/create" class="btn-indigo">
    <span>Create</span>
    <span class="hidden md:inline">User</span>
  </a>
</div>
<div class="overflow-x-auto rounded-md bg-white shadow">
  <table class="w-full whitespace-nowrap">
    <tr class="text-left font-bold">
      <th class="px-6 pb-4 pt-6">Name</th>
      <th class="px-6 pb-4 pt-6">Email</th>
      <th class="px-6 pb-4 pt-6" colspan="2">Role</th>
    </tr>
    {#each users as user (user.id)}
      <tr class="focus-within:bg-gray-100 hover:bg-gray-100">
        <td class="border-t">
          <a use:inertia href="/users/{user.id}/edit" class="flex items-center px-6 py-4 focus:text-indigo-500">
            {#if user.photo}
              <img class="-my-2 mr-2 block h-5 w-5 rounded-full" src={user.photo} alt="user" />
            {/if}
            {user.name}
            {#if user.deleted_at}
              <Icon name="trash" class="ml-2 h-3 w-3 shrink-0 fill-gray-400" />
            {/if}
          </a>
        </td>
        <td class="border-t">
          <a use:inertia href="/users/{user.id}/edit" class="flex items-center px-6 py-4" tabindex="-1">
            {user.email || ''}
          </a>
        </td>
        <td class="border-t">
          <a use:inertia href="/users/{user.id}/edit" class="flex items-center px-6 py-4" tabindex="-1">
            {user.owner ? 'Owner' : 'User'}
          </a>
        </td>
        <td class="w-px border-t">
          <a use:inertia href="/users/{user.id}/edit" class="flex items-center px-4" tabindex="-1">
            <Icon name="cheveron-right" class="block h-6 w-6 fill-gray-400" />
          </a>
        </td>
      </tr>
    {/each}

    {#if users.length === 0}
      <tr>
        <td class="border-t px-6 py-4" colspan="4">No users found.</td>
      </tr>
    {/if}
  </table>
</div>
