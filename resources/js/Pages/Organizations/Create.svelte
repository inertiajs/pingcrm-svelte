<script context="module">
  import Layout, { title } from '@/Shared/Layout.svelte'
  export const layout = Layout
</script>

<script>
  import { inertia, useForm } from '@inertiajs/inertia-svelte'
  import { route } from '@/utils'
  import LoadingButton from '@/Shared/LoadingButton.svelte'
  import SelectInput from '@/Shared/SelectInput.svelte'
  import TextInput from '@/Shared/TextInput.svelte'

  $title = 'Create Organization'

  let form = useForm(`CreateOrganization`, {
    name: null,
    email: null,
    phone: null,
    address: null,
    city: null,
    region: null,
    country: null,
    postal_code: null,
  })

  function store() {
    $form.post(route('organizations.store'))
  }
</script>

<h1 class="mb-8 font-bold text-3xl">
  <a use:inertia href={route('organizations')} class="text-indigo-400 hover:text-indigo-600">
    Organizations
  </a>
  <span class="text-indigo-400 font-medium">/</span> Create
</h1>

<div class="bg-white rounded-md shadow overflow-hidden max-w-3xl">
  <form on:submit|preventDefault={store}>
    <div class="p-8 -mr-6 -mb-8 flex flex-wrap">
      <TextInput
        bind:value={$form.name}
        error={$form.errors.name}
        class="pr-6 pb-8 w-full lg:w-1/2"
        label="Name:" />
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
        label="Country:">
        <option value={null} />
        <option value="CA">Canada</option>
        <option value="US">United States</option>
      </SelectInput>
      <TextInput
        bind:value={$form.postal_code}
        error={$form.errors.postal_code}
        class="pr-6 pb-8 w-full lg:w-1/2"
        label="Postal code:" />
    </div>
    <div class="px-8 py-4 bg-gray-50 border-t border-gray-100 flex justify-end items-center">
      <LoadingButton loading={$form.processing} class="btn-indigo" type="submit">
        Create Organization
      </LoadingButton>
    </div>
  </form>
</div>
