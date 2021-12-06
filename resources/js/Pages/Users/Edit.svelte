<script context="module">
  import Layout, { title } from '@/Shared/Layout.svelte'
  export const layout = Layout
</script>

<script>
  import { Inertia } from '@inertiajs/inertia'
  import { inertia, useForm } from '@inertiajs/inertia-svelte'
  import { route } from '@/utils'
  import FileInput from '@/Shared/FileInput.svelte'
  import LoadingButton from '@/Shared/LoadingButton.svelte'
  import SelectInput from '@/Shared/SelectInput.svelte'
  import TextInput from '@/Shared/TextInput.svelte'
  import TrashedMessage from '@/Shared/TrashedMessage.svelte'

  export let user = {}

  $: $title = user ? `${user.first_name} ${user.last_name}` : null

  let form = useForm(`EditUser:${user.id}`, {
    _method: 'put',
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    password: null,
    owner: user.owner,
    photo: null,
  })

  function update() {
    $form.post(route('users.update', user.id).url(), {
      onSuccess: () => $form.reset('password', 'photo'),
    })
  }

  function destroy() {
    if (confirm('Are you sure you want to delete this user?')) {
      Inertia.delete(route('users.destroy', user.id))
    }
  }

  function restore() {
    if (confirm('Are you sure you want to restore this user?')) {
      Inertia.put(route('users.restore', user.id))
    }
  }
</script>

<div class="mb-8 flex justify-start max-w-3xl">
  <h1 class="font-bold text-3xl">
    <a use:inertia href={route('users')} class="text-indigo-400 hover:text-indigo-600">
      Users
    </a>
    <span class="text-indigo-400 font-medium">/</span>
    {user.first_name}
    {user.last_name}
  </h1>

  {#if user.photo}
    <img
      class="block w-8 h-8 rounded-full ml-4"
      src={user.photo}
      alt={`${user.first_name} ${user.last_name} profile picture`} />
  {/if}
</div>

{#if user.deleted_at}
  <TrashedMessage class="mb-6" on:restore={restore}>This user has been deleted.</TrashedMessage>
{/if}

<div class="bg-white rounded-md shadow overflow-hidden max-w-3xl">
  <form on:submit|preventDefault={update}>
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
        autocomplete="new-password"
        class="pr-6 pb-8 w-full lg:w-1/2"
        type="password"
        label="Password:" />
      <SelectInput
        bind:value={$form.owner}
        error={$form.errors.owner}
        class="pr-6 pb-8 w-full lg:w-1/2"
        label="Owner:"
        let:selected>
        <option value="1" selected={selected === true}>Yes</option>
        <option value="0" selected={selected === false}>No</option>
      </SelectInput>
      <FileInput
        bind:value={$form.photo}
        error={$form.errors.photo}
        class="pr-6 pb-8 w-full lg:w-1/2"
        accept="image/*"
        label="Photo:" />
    </div>
    <div class="px-8 py-4 bg-gray-50 border-t border-gray-100 flex items-center">
      {#if !user.deleted_at}
        <button class="text-red-600 hover:underline" tabindex="-1" type="button" on:click={destroy}>
          Delete User
        </button>
      {/if}

      <LoadingButton loading={$form.processing} class="btn-indigo ml-auto" type="submit">
        Update User
      </LoadingButton>
    </div>
  </form>
</div>
