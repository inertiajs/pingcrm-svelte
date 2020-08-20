<script>
  import { Inertia } from '@inertiajs/inertia'
  import { InertiaLink, page, remember } from '@inertiajs/inertia-svelte'
  import { route } from '@/utils'
  import Layout from '@/Shared/Layout.svelte'
  import LoadingButton from '@/Shared/LoadingButton.svelte'
  import SelectInput from '@/Shared/SelectInput.svelte'
  import TextInput from '@/Shared/TextInput.svelte'

  let sending = false
  let form = remember({
    name: null,
    email: null,
    phone: null,
    address: null,
    city: null,
    region: null,
    country: null,
    postal_code: null,
  })

  function submit() {
    sending = true
    Inertia.post(route('organizations.store'), $form)
      .then(() => sending = false)
  }
</script>

<Layout title="Create Organization">
  <h1 class="mb-8 font-bold text-3xl">
    <InertiaLink
      href={route('organizations')}
      class="text-indigo-400 hover:text-indigo-600">
      Organizations
    </InertiaLink>
    <span class="text-indigo-400 font-medium">/</span>
    Create
  </h1>

  <div class="bg-white rounded shadow overflow-hidden max-w-3xl">
    <form on:submit|preventDefault={submit}>
      <div class="p-8 -mr-6 -mb-8 flex flex-wrap">
        <TextInput
          bind:value={$form.name}
          errors={$page.errors.name}
          class="pr-6 pb-8 w-full lg:w-1/2"
          label="Name:" />
        <TextInput
          bind:value={$form.email}
          errors={$page.errors.email}
          class="pr-6 pb-8 w-full lg:w-1/2"
          label="Email:" />
        <TextInput
          bind:value={$form.phone}
          errors={$page.errors.phone}
          class="pr-6 pb-8 w-full lg:w-1/2"
          label="Phone:" />
        <TextInput
          bind:value={$form.address}
          errors={$page.errors.address}
          class="pr-6 pb-8 w-full lg:w-1/2"
          label="Address:" />
        <TextInput
          bind:value={$form.city}
          errors={$page.errors.city}
          class="pr-6 pb-8 w-full lg:w-1/2"
          label="City:" />
        <TextInput
          bind:value={$form.region}
          errors={$page.errors.region}
          class="pr-6 pb-8 w-full lg:w-1/2"
          label="Province/State:" />
        <SelectInput
          bind:value={$form.country}
          errors={$page.errors.country}
          class="pr-6 pb-8 w-full lg:w-1/2"
          label="Country:">
          <option value={null} />
          <option value="CA">Canada</option>
          <option value="US">United States</option>
        </SelectInput>
        <TextInput
          bind:value={$form.postal_code}
          errors={$page.errors.postal_code}
          class="pr-6 pb-8 w-full lg:w-1/2"
          label="Postal code:" />
      </div>
      <div class="px-8 py-4 bg-gray-100 border-t border-gray-200 flex justify-end items-center">
        <LoadingButton loading={sending} class="btn-indigo" type="submit">
          Create Organization
        </LoadingButton>
      </div>
    </form>
  </div>
</Layout>
