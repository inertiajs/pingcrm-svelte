<script context="module">
  import Layout, { title } from '@/Shared/Layout.svelte'
  export const layout = Layout
</script>

<script>
  import { Inertia } from '@inertiajs/inertia'
  import { inertia, useForm } from '@inertiajs/inertia-svelte'
  import { route } from '@/utils'
  import LoadingButton from '@/Shared/LoadingButton.svelte'
  import SelectInput from '@/Shared/SelectInput.svelte'
  import TextInput from '@/Shared/TextInput.svelte'
  import TrashedMessage from '@/Shared/TrashedMessage.svelte'

  export let contact = {}
  export let organizations = []

  $: $title = contact ? `${contact.first_name} ${contact.last_name}` : null

  let form = useForm(`EditContact:${contact.id}`, {
    first_name: contact.first_name,
    last_name: contact.last_name,
    organization_id: contact.organization_id,
    email: contact.email,
    phone: contact.phone,
    address: contact.address,
    city: contact.city,
    region: contact.region,
    country: contact.country,
    postal_code: contact.postal_code,
  })

  function update() {
    $form.put(route('contacts.update', contact.id))
  }

  function destroy() {
    if (confirm('Are you sure you want to delete this contact?')) {
      Inertia.delete(route('contacts.destroy', contact.id))
    }
  }

  function restore() {
    if (confirm('Are you sure you want to restore this contact?')) {
      Inertia.put(route('contacts.restore', contact.id))
    }
  }
</script>

<h1 class="mb-8 font-bold text-3xl">
  <a use:inertia href={route('contacts')} class="text-indigo-400 hover:text-indigo-600">
    Contacts
  </a>
  <span class="text-indigo-400 font-medium">/</span>
  {contact.first_name}
  {contact.last_name}
</h1>
{#if contact.deleted_at}
  <TrashedMessage v-if="contact.deleted_at" class="mb-6" on:restore={restore}>
    This contact has been deleted.
  </TrashedMessage>
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
      <SelectInput
        bind:value={$form.organization_id}
        error={$form.errors.organization_id}
        class="pr-6 pb-8 w-full lg:w-1/2"
        label="Organization:"
        let:selected>
        <option value={null} />
        {#each organizations as organization (organization.id)}
          <option value={organization.id} selected={selected == organization.id}>
            {organization.name}
          </option>
        {/each}
      </SelectInput>
      <TextInput
        bind:value={$form.email}
        error={$form.errors.email}
        class="pr-6 pb-8 w-full lg:w-1/2"
        label="Email:" />
      <TextInput
        bind:value={$form.phone}
        error={$form.errors.phone}
        class="pr-6 pb-8 w-full lg:w-1/2"
        label="Phone:" />
      <TextInput
        bind:value={$form.address}
        error={$form.errors.address}
        class="pr-6 pb-8 w-full lg:w-1/2"
        label="Address:" />
      <TextInput
        bind:value={$form.city}
        error={$form.errors.city}
        class="pr-6 pb-8 w-full lg:w-1/2"
        label="City:" />
      <TextInput
        bind:value={$form.region}
        error={$form.errors.region}
        class="pr-6 pb-8 w-full lg:w-1/2"
        label="Province/State:" />
      <SelectInput
        bind:value={$form.country}
        error={$form.errors.country}
        class="pr-6 pb-8 w-full lg:w-1/2"
        label="Country:"
        let:selected>
        <option value={null} />
        <option value="CA" selected={selected === 'CA'}>Canada</option>
        <option value="US" selected={selected === 'US'}>United States</option>
      </SelectInput>
      <TextInput
        bind:value={$form.postal_code}
        error={$form.errors.postal_code}
        class="pr-6 pb-8 w-full lg:w-1/2"
        label="Postal code:" />
    </div>
    <div class="px-8 py-4 bg-gray-50 border-t border-gray-100 flex items-center">
      {#if !contact.deleted_at}
        <button class="text-red-600 hover:underline" tabindex="-1" type="button" on:click={destroy}>
          Delete Contact
        </button>
      {/if}
      <LoadingButton loading={$form.processing} class="btn-indigo ml-auto" type="submit">
        Update Contact
      </LoadingButton>
    </div>
  </form>
</div>
