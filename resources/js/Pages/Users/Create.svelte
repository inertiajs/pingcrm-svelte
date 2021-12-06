<script context="module">
  import Layout, { title } from '@/Shared/Layout.svelte'
  export const layout = Layout
</script>

<script>
  import { inertia, useForm } from '@inertiajs/inertia-svelte'
  import { route } from '@/utils'
  import FileInput from '@/Shared/FileInput.svelte'
  import LoadingButton from '@/Shared/LoadingButton.svelte'
  import SelectInput from '@/Shared/SelectInput.svelte'
  import TextInput from '@/Shared/TextInput.svelte'

  $title = 'Create User'

  let form = useForm(`CreateUser`, {
    first_name: null,
    last_name: null,
    email: null,
    password: null,
    owner: false,
    photo: null,
  })

  function store() {
    $form.post(route('users.store').url())
  }
</script>

<h1 class="mb-8 font-bold text-3xl">
  <a use:inertia href={route('users')} class="text-indigo-400 hover:text-indigo-600">
    Users
  </a>
  <span class="text-indigo-400 font-medium">/</span> Create
</h1>

<div class="bg-white rounded-md shadow overflow-hidden max-w-3xl">
  <form on:submit|preventDefault={store}>
    <div class="p-8 -mr-6 -mb-8 flex flex-wrap">
      <TextInput
        bind:value={$form.first_name}
        error={$form.errors.first_name}
        class="pr-6 pb-8 w-full lg:w-1/2"
        label="First name:" />
      <TextInput
        bind:value={$form.last_name}
        error={$form.errors.last_name}
        class="pr-6 pb-8 w-full lg:w-1/2"
        label="Last name:" />
      <TextInput
        bind:value={$form.email}
        error={$form.errors.email}
        class="pr-6 pb-8 w-full lg:w-1/2"
        label="Email:" />
      <TextInput
        bind:value={$form.password}
        error={$form.errors.password}
        class="pr-6 pb-8 w-full lg:w-1/2"
        type="password"
        autocomplete="new-password"
        label="Password:" />
      <SelectInput
        bind:value={$form.owner}
        error={$form.errors.owner}
        class="pr-6 pb-8 w-full lg:w-1/2"
        label="Owner:">
        <option value="1">Yes</option>
        <option value="0">No</option>
      </SelectInput>
      <FileInput
        bind:value={$form.photo}
        error={$form.errors.photo}
        class="pr-6 pb-8 w-full lg:w-1/2"
        type="file"
        accept="image/*"
        label="Photo:" />
    </div>
    <div class="px-8 py-4 bg-gray-50 border-t border-gray-100 flex justify-end items-center">
      <LoadingButton loading={$form.processing} class="btn-indigo" type="submit">Create User</LoadingButton>
    </div>
  </form>
</div>
