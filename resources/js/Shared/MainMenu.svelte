<script>
  import { InertiaLink } from '@inertiajs/inertia-svelte'
  import { route } from '@/utils'
  import Icon from '@/Shared/Icon.svelte'

  function isUrl(...urls) {
    if (urls[0] === '') {
      return location.pathname.substr(1) === ''
    }

    return urls.filter((url) => location.pathname.substr(1).startsWith(url)).length
  }
</script>

<div {...$$restProps}>
  <div class="mb-4">
    <InertiaLink href={route('dashboard')} class="flex items-center group py-3">
      <Icon
        name="dashboard"
        class="w-4 h-4 mr-2 {isUrl('') ? 'fill-white' : 'fill-indigo-400 group-hover:fill-white'}" />
      <div class={isUrl('') ? 'text-white' : 'text-indigo-300 group-hover:text-white'}>
        Dashboard
      </div>
    </InertiaLink>
  </div>
  <div class="mb-4">
    <InertiaLink href={route('organizations')} class="flex items-center group py-3">
      <Icon
        name="office"
        class="w-4 h-4 mr-2 {isUrl('organizations') ? 'fill-white' : 'fill-indigo-400 group-hover:fill-white'}" />
      <div class={isUrl('organizations') ? 'text-white' : 'text-indigo-300 group-hover:text-white'}>
        Organizations
      </div>
    </InertiaLink>
  </div>
  <div class="mb-4">
    <InertiaLink href={route('contacts')} class="flex items-center group py-3">
      <Icon
        name="users"
        class="w-4 h-4 mr-2 {isUrl('contacts') ? 'fill-white' : 'fill-indigo-400 group-hover:fill-white'}" />
      <div class={isUrl('contacts') ? 'text-white' : 'text-indigo-300 group-hover:text-white'}>
        Contacts
      </div>
    </InertiaLink>
  </div>
  <div class="mb-4">
    <InertiaLink href={route('reports')} class="flex items-center group py-3">
      <Icon
        name="printer"
        class="w-4 h-4 mr-2 {isUrl('reports') ? 'fill-white' : 'fill-indigo-400 group-hover:fill-white'}" />
      <div class={isUrl('reports') ? 'text-white' : 'text-indigo-300 group-hover:text-white'}>
        Reports
      </div>
    </InertiaLink>
  </div>
</div>
