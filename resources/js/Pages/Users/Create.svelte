<script context="module">
  import Layout, { title } from '@/Shared/Layout.svelte'
  export const layout = Layout
</script>

<script>
  import { Inertia } from '@inertiajs/inertia'
  import { inertia, remember } from '@inertiajs/inertia-svelte'
  import { route } from '@/utils'
  import FileInput from '@/Shared/FileInput.svelte'
  import LoadingButton from '@/Shared/LoadingButton.svelte'
  import SelectInput from '@/Shared/SelectInput.svelte'
  import TextInput from '@/Shared/TextInput.svelte'

  export let errors = {}

  $title = 'Create User'

  let sending = false
  let form = remember({
    first_name: null,
    last_name: null,
    email: null,
    password: null,
    owner: false,
    photo: null,
  })

  function submit() {
    const data = new FormData()
    data.append('first_name', $form.first_name || '')
    data.append('last_name', $form.last_name || '')
    data.append('email', $form.email || '')
    data.append('password', $form.password || '')
    data.append('owner', $form.owner ? 1 : 0)
    data.append('photo', $form.photo || '')

    Inertia.post(route('users.store'), data, {
      onStart: () => sending = true,
      onFinish: () => sending = false,
    })
  }
</script>

<h1 class="mb-8 font-bold text-3xl">
  <a use:inertia href={route('users')} class="text-indigo-400 hover:text-indigo-600">
    Users
  </a>
  <span class="text-indigo-400 font-medium">/</span> Create
</h1>

<div class="bg-white rounded shadow overflow-hidden max-w-3xl">
  <form on:submit|preventDefault={submit}>
    <div class="p-8 -mr-6 -mb-8 flex flex-wrap">
      <TextInput
        bind:value={$form.first_name}
        error={errors.first_name}
        class="pr-6 pb-8 w-full lg:w-1/2"
        label="First name:" />
      <TextInput
        bind:value={$form.last_name}
        error={errors.last_name}
        class="pr-6 pb-8 w-full lg:w-1/2"
        label="Last name:" />
      <TextInput
        bind:value={$form.email}
        error={errors.email}
        class="pr-6 pb-8 w-full lg:w-1/2"
        label="Email:" />
      <TextInput
        bind:value={$form.password}
        error={errors.password}
        class="pr-6 pb-8 w-full lg:w-1/2"
        type="password"
        autocomplete="new-password"
        label="Password:" />
      <SelectInput
        bind:value={$form.owner}
        error={errors.owner}
        class="pr-6 pb-8 w-full lg:w-1/2"
        label="Owner:">
        <option value={true}>Yes</option>
        <option value={false}>No</option>
      </SelectInput>
      <FileInput
        bind:value={$form.photo}
        error={errors.photo}
        class="pr-6 pb-8 w-full lg:w-1/2"
        type="file"
        accept="image/*"
        label="Photo:" />
    </div>
    <div class="px-8 py-4 bg-gray-100 border-t border-gray-200 flex justify-end items-center">
      <LoadingButton loading={sending} class="btn-indigo" type="submit">Create User</LoadingButton>
    </div>
  </form>
</div>
