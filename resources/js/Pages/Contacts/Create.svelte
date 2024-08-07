<script context="module">
  import Layout, { title } from '@/Shared/Layout.svelte'
  export const layout = Layout
</script>

<script>
  import { inertia, useForm } from '@inertiajs/svelte'
  import LoadingButton from '@/Shared/LoadingButton.svelte'
  import SelectInput from '@/Shared/SelectInput.svelte'
  import TextInput from '@/Shared/TextInput.svelte'

  export let organizations = []

  $title = 'Create Contact'

  let form = useForm('CreateContact', {
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

  function store() {
    $form.post('/contacts')
  }
</script>

<h1 class="mb-8 text-3xl font-bold">
  <a use:inertia href="/contacts" class="text-indigo-400 hover:text-indigo-600"> Contacts </a>
  <span class="font-medium text-indigo-400">/</span> Create
</h1>
<div class="max-w-3xl overflow-hidden rounded-md bg-white shadow">
  <form on:submit|preventDefault={store}>
    <div class="-mb-8 -mr-6 flex flex-wrap p-8">
      <TextInput bind:value={$form.first_name} error={$form.errors.first_name} class="w-full pb-8 pr-6 lg:w-1/2" label="First name:" />
      <TextInput bind:value={$form.last_name} error={$form.errors.last_name} class="w-full pb-8 pr-6 lg:w-1/2" label="Last name:" />
      <SelectInput bind:value={$form.organization_id} error={$form.errors.organization_id} class="w-full pb-8 pr-6 lg:w-1/2" label="Organization:">
        <option value={null} />
        {#each organizations as organization (organization.id)}
          <option value={organization.id}>{organization.name}</option>
        {/each}
      </SelectInput>
      <TextInput bind:value={$form.email} error={$form.errors.email} class="w-full pb-8 pr-6 lg:w-1/2" label="Email:" />
      <TextInput bind:value={$form.phone} error={$form.errors.phone} class="w-full pb-8 pr-6 lg:w-1/2" label="Phone:" />
      <TextInput bind:value={$form.address} error={$form.errors.address} class="w-full pb-8 pr-6 lg:w-1/2" label="Address:" />
      <TextInput bind:value={$form.city} error={$form.errors.city} class="w-full pb-8 pr-6 lg:w-1/2" label="City:" />
      <TextInput bind:value={$form.region} error={$form.errors.region} class="w-full pb-8 pr-6 lg:w-1/2" label="Province/State:" />
      <SelectInput bind:value={$form.country} error={$form.errors.country} class="w-full pb-8 pr-6 lg:w-1/2" label="Country:">
        <option value={null} />
        <option value="CA">Canada</option>
        <option value="US">United States</option>
      </SelectInput>
      <TextInput bind:value={$form.postal_code} error={$form.errors.postal_code} class="w-full pb-8 pr-6 lg:w-1/2" label="Postal code:" />
    </div>
    <div class="flex items-center justify-end border-t border-gray-100 bg-gray-50 px-8 py-4">
      <LoadingButton loading={$form.processing} class="btn-indigo" type="submit">Create Contact</LoadingButton>
    </div>
  </form>
</div>
