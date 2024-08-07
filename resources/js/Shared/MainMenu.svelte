<script>
  import { inertia, page } from '@inertiajs/svelte'
  import Icon from '@/Shared/Icon.svelte'

  $: isUrl = (...urls) => {
    let currentUrl = $page.url.substr(1)

    if (urls[0] === '') {
      return currentUrl === ''
    }

    return urls.filter((url) => currentUrl.startsWith(url)).length
  }
</script>

<div {...$$restProps}>
  <div class="mb-4">
    <a use:inertia href="/" class="group flex items-center py-3">
      <Icon name="dashboard" class="mr-2 h-4 w-4 {isUrl('') ? 'fill-white' : 'fill-indigo-400 group-hover:fill-white'}" />
      <div class={isUrl('') ? 'text-white' : 'text-indigo-300 group-hover:text-white'}>Dashboard</div>
    </a>
  </div>
  <div class="mb-4">
    <a use:inertia href="/organizations" class="group flex items-center py-3">
      <Icon name="office" class="mr-2 h-4 w-4 {isUrl('organizations') ? 'fill-white' : 'fill-indigo-400 group-hover:fill-white'}" />
      <div class={isUrl('organizations') ? 'text-white' : 'text-indigo-300 group-hover:text-white'}>Organizations</div>
    </a>
  </div>
  <div class="mb-4">
    <a use:inertia href="/contacts" class="group flex items-center py-3">
      <Icon name="users" class="mr-2 h-4 w-4 {isUrl('contacts') ? 'fill-white' : 'fill-indigo-400 group-hover:fill-white'}" />
      <div class={isUrl('contacts') ? 'text-white' : 'text-indigo-300 group-hover:text-white'}>Contacts</div>
    </a>
  </div>
  <div class="mb-4">
    <a use:inertia href="/reports" class="group flex items-center py-3">
      <Icon name="printer" class="mr-2 h-4 w-4 {isUrl('reports') ? 'fill-white' : 'fill-indigo-400 group-hover:fill-white'}" />
      <div class={isUrl('reports') ? 'text-white' : 'text-indigo-300 group-hover:text-white'}>Reports</div>
    </a>
  </div>
</div>
