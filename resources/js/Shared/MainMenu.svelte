<script>
  import { inertia, page } from '@inertiajs/inertia-svelte'
  import { route } from '@/utils'
  import Icon from '@/Shared/Icon.svelte'

  $: isUrl = (...urls) => {
    let currentUrl = $page.url.substr(1)

    if (urls[0] === '') {
      return currentUrl === ''
    }

    return urls.filter(url => currentUrl.startsWith(url)).length
  }
</script>

<div {...$$restProps}>
  <div class="mb-4">
    <a use:inertia href={route('dashboard')} class="flex items-center group py-3">
      <Icon
        name="dashboard"
        class="w-4 h-4 mr-2 {isUrl('') ? 'fill-white' : 'fill-indigo-400 group-hover:fill-white'}" />
      <div class={isUrl('') ? 'text-white' : 'text-indigo-300 group-hover:text-white'}>
        Dashboard
      </div>
    </a>
  </div>
  <div class="mb-4">
    <a use:inertia href={route('organizations')} class="flex items-center group py-3">
      <Icon
        name="office"
        class="w-4 h-4 mr-2 {isUrl('organizations') ? 'fill-white' : 'fill-indigo-400 group-hover:fill-white'}" />
      <div class={isUrl('organizations') ? 'text-white' : 'text-indigo-300 group-hover:text-white'}>
        Organizations
      </div>
    </a>
  </div>
  <div class="mb-4">
    <a use:inertia href={route('contacts')} class="flex items-center group py-3">
      <Icon
        name="users"
        class="w-4 h-4 mr-2 {isUrl('contacts') ? 'fill-white' : 'fill-indigo-400 group-hover:fill-white'}" />
      <div class={isUrl('contacts') ? 'text-white' : 'text-indigo-300 group-hover:text-white'}>
        Contacts
      </div>
    </a>
  </div>
  <div class="mb-4">
    <a use:inertia href={route('reports')} class="flex items-center group py-3">
      <Icon
        name="printer"
        class="w-4 h-4 mr-2 {isUrl('reports') ? 'fill-white' : 'fill-indigo-400 group-hover:fill-white'}" />
      <div class={isUrl('reports') ? 'text-white' : 'text-indigo-300 group-hover:text-white'}>
        Reports
      </div>
    </a>
  </div>
</div>
