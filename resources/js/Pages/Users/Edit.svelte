<script context="module">
  import Layout, { title } from '@/Shared/Layout.svelte'
  export const layout = Layout
</script>

<script>
  import { router } from '@inertiajs/core'
  import { inertia, useForm } from '@inertiajs/svelte'
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
    $form.post(`/users/${user.id}`, {
      onSuccess: () => $form.reset('password', 'photo'),
    })
  }

  function destroy() {
    if (confirm('Are you sure you want to delete this user?')) {
      router.delete(`/users/${user.id}`)
    }
  }

  function restore() {
    if (confirm('Are you sure you want to restore this user?')) {
      router.put(`/users/${user.id}/restore`)
    }
  }
</script>

<div class="mb-8 flex max-w-3xl justify-start">
  <h1 class="text-3xl font-bold">
    <a use:inertia href="/users" class="text-indigo-400 hover:text-indigo-600"> Users </a>
    <span class="font-medium text-indigo-400">/</span>
    {user.first_name}
    {user.last_name}
  </h1>

  {#if user.photo}
    <img class="ml-4 block h-8 w-8 rounded-full" src={user.photo} alt={`${user.first_name} ${user.last_name} profile picture`} />
  {/if}
</div>

{#if user.deleted_at}
  <TrashedMessage class="mb-6" on:restore={restore}>This user has been deleted.</TrashedMessage>
{/if}

<div class="max-w-3xl overflow-hidden rounded-md bg-white shadow">
  <form on:submit|preventDefault={update}>
    <div class="-mb-8 -mr-6 flex flex-wrap p-8">
      <TextInput bind:value={$form.first_name} error={$form.errors.first_name} class="w-full pb-8 pr-6 lg:w-1/2" label="First name:" />
      <TextInput bind:value={$form.last_name} error={$form.errors.last_name} class="w-full pb-8 pr-6 lg:w-1/2" label="Last name:" />
      <TextInput bind:value={$form.email} error={$form.errors.email} class="w-full pb-8 pr-6 lg:w-1/2" label="Email:" />
      <TextInput bind:value={$form.password} error={$form.errors.password} autocomplete="new-password" class="w-full pb-8 pr-6 lg:w-1/2" type="password" label="Password:" />
      <SelectInput bind:value={$form.owner} error={$form.errors.owner} class="w-full pb-8 pr-6 lg:w-1/2" label="Owner:" let:selected>
        <option value="1" selected={selected === true}>Yes</option>
        <option value="0" selected={selected === false}>No</option>
      </SelectInput>
      <FileInput bind:value={$form.photo} error={$form.errors.photo} class="w-full pb-8 pr-6 lg:w-1/2" accept="image/*" label="Photo:" />
    </div>
    <div class="flex items-center border-t border-gray-100 bg-gray-50 px-8 py-4">
      {#if !user.deleted_at}
        <button class="text-red-600 hover:underline" tabindex="-1" type="button" on:click={destroy}> Delete User </button>
      {/if}

      <LoadingButton loading={$form.processing} class="btn-indigo ml-auto" type="submit">Update User</LoadingButton>
    </div>
  </form>
</div>
