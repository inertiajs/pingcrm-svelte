<script context="module">
  import Layout, { title } from '@/Shared/Layout.svelte'
  export const layout = Layout
</script>

<script>
  import { Inertia } from '@inertiajs/inertia'
  import { inertia, remember } from '@inertiajs/inertia-svelte'
  import { route } from '@/utils'
  import LoadingButton from '@/Shared/LoadingButton.svelte'
  import SelectInput from '@/Shared/SelectInput.svelte'
  import TextInput from '@/Shared/TextInput.svelte'

  export let errors = {}
  export let organizations = []

  $title = 'Create Contact'

  let sending = false
  let form = remember({
    first_name: null,
    last_name: null,
    organization_id: null,
    email: null,
    phone: null,
    address: null,
    city: null,
    region: null,
    country: null,
    postal_code: null,
  })

  function submit() {
    Inertia.post(route('contacts.store'), $form, {
      onStart: () => sending = true,
      onFinish: () => sending = false,
    })
  }
</script>

<h1 class="mb-8 font-bold text-3xl">
  <a use:inertia href={route('contacts')} class="text-indigo-400 hover:text-indigo-600">
    Contacts
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
      <SelectInput
        bind:value={$form.organization_id}
        error={errors.organization_id}
        class="pr-6 pb-8 w-full lg:w-1/2"
        label="Organization:">
        <option value={null} />
        {#each organizations as organization (organization.id)}
          <option value={organization.id}>{organization.name}</option>
        {/each}
      </SelectInput>
      <TextInput
        bind:value={$form.email}
        error={errors.email}
        class="pr-6 pb-8 w-full lg:w-1/2"
        label="Email:" />
      <TextInput
        bind:value={$form.phone}
        error={errors.phone}
        class="pr-6 pb-8 w-full lg:w-1/2"
        label="Phone:" />
      <TextInput
        bind:value={$form.address}
        error={errors.address}
        class="pr-6 pb-8 w-full lg:w-1/2"
        label="Address:" />
      <TextInput
        bind:value={$form.city}
        error={errors.city}
        class="pr-6 pb-8 w-full lg:w-1/2"
        label="City:" />
      <TextInput
        bind:value={$form.region}
        error={errors.region}
        class="pr-6 pb-8 w-full lg:w-1/2"
        label="Province/State:" />
      <SelectInput
        bind:value={$form.country}
        error={errors.country}
        class="pr-6 pb-8 w-full lg:w-1/2"
        label="Country:">
        <option value={null} />
        <option value="CA">Canada</option>
        <option value="US">United States</option>
      </SelectInput>
      <TextInput
        bind:value={$form.postal_code}
        error={errors.postal_code}
        class="pr-6 pb-8 w-full lg:w-1/2"
        label="Postal code:" />
    </div>
    <div class="px-8 py-4 bg-gray-100 border-t border-gray-200 flex justify-end items-center">
      <LoadingButton loading={sending} class="btn-indigo" type="submit">
        Create Contact
      </LoadingButton>
    </div>
  </form>
</div>
