<script context="module">
  import Layout, { title } from '@/Shared/Layout.svelte'
  export const layout = Layout
</script>

<script>
  import { inertia, useForm } from '@inertiajs/svelte'
  import FileInput from '@/Shared/FileInput.svelte'
  import LoadingButton from '@/Shared/LoadingButton.svelte'
  import SelectInput from '@/Shared/SelectInput.svelte'
  import TextInput from '@/Shared/TextInput.svelte'

  $title = 'Create User'

  let form = useForm('CreateUser', {
    first_name: null,
    last_name: null,
    email: null,
    password: null,
    owner: false,
    photo: null,
  })

  function store() {
    $form.post('/users')
  }
</script>

<h1 class="mb-8 text-3xl font-bold">
  <a use:inertia href="/users" class="text-indigo-400 hover:text-indigo-600"> Users </a>
  <span class="font-medium text-indigo-400">/</span> Create
</h1>

<div class="max-w-3xl overflow-hidden rounded-md bg-white shadow">
  <form on:submit|preventDefault={store}>
    <div class="-mb-8 -mr-6 flex flex-wrap p-8">
      <TextInput bind:value={$form.first_name} error={$form.errors.first_name} class="w-full pb-8 pr-6 lg:w-1/2" label="First name:" />
      <TextInput bind:value={$form.last_name} error={$form.errors.last_name} class="w-full pb-8 pr-6 lg:w-1/2" label="Last name:" />
      <TextInput bind:value={$form.email} error={$form.errors.email} class="w-full pb-8 pr-6 lg:w-1/2" label="Email:" />
      <TextInput bind:value={$form.password} error={$form.errors.password} class="w-full pb-8 pr-6 lg:w-1/2" type="password" autocomplete="new-password" label="Password:" />
      <SelectInput bind:value={$form.owner} error={$form.errors.owner} class="w-full pb-8 pr-6 lg:w-1/2" label="Owner:">
        <option value="1">Yes</option>
        <option value="0">No</option>
      </SelectInput>
      <FileInput bind:value={$form.photo} error={$form.errors.photo} class="w-full pb-8 pr-6 lg:w-1/2" type="file" accept="image/*" label="Photo:" />
    </div>
    <div class="flex items-center justify-end border-t border-gray-100 bg-gray-50 px-8 py-4">
      <LoadingButton loading={$form.processing} class="btn-indigo" type="submit">Create User</LoadingButton>
    </div>
  </form>
</div>
