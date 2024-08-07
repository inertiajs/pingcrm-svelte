<script context="module">
  import { writable } from 'svelte/store'
  export const title = writable(null)
</script>

<script>
  import { inertia } from '@inertiajs/svelte'
  import Dropdown from '@/Shared/Dropdown.svelte'
  import FlashMessages from '@/Shared/FlashMessages.svelte'
  import Icon from '@/Shared/Icon.svelte'
  import Logo from '@/Shared/Logo.svelte'
  import MainMenu from '@/Shared/MainMenu.svelte'

  export let auth
</script>

<svelte:head>
  <title>{$title ? `${$title} - Ping CRM` : 'Ping CRM'}</title>
</svelte:head>

<div class="md:flex md:flex-col">
  <div class="md:flex md:h-screen md:flex-col">
    <div class="md:flex md:shrink-0">
      <div class="flex items-center justify-between bg-indigo-900 px-6 py-4 md:w-56 md:shrink-0 md:justify-center">
        <a use:inertia href="/" class="mt-1">
          <Logo class="fill-white" width="120" height="28" />
        </a>
        <Dropdown class="md:hidden" placement="bottom-end">
          <svg class="h-6 w-6 fill-white" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
          <div slot="dropdown" class="mt-2 rounded bg-indigo-800 px-8 py-4 shadow-lg">
            <MainMenu />
          </div>
        </Dropdown>
      </div>
      <div class="md:text-md flex w-full items-center justify-between border-b bg-white p-4 text-sm md:px-12 md:py-0">
        <div class="mr-4 mt-1">{auth.user.account.name}</div>
        <Dropdown class="mt-1" placement="bottom-end">
          <div class="group flex cursor-pointer select-none items-center">
            <div class="mr-1 whitespace-nowrap text-gray-700 focus:text-indigo-600 group-hover:text-indigo-600">
              <span>{auth.user.first_name}</span>
              <span class="hidden md:inline">{auth.user.last_name}</span>
            </div>
            <Icon name="cheveron-down" class="h-5 w-5 fill-gray-700 focus:fill-indigo-600 group-hover:fill-indigo-600" />
          </div>
          <div slot="dropdown" class="mt-2 rounded bg-white py-2 text-sm shadow-xl">
            <a use:inertia href="/users/{auth.user.id}/edit" class="block px-6 py-2 hover:bg-indigo-500 hover:text-white"> My Profile </a>
            <a use:inertia href="/users" class="block px-6 py-2 hover:bg-indigo-500 hover:text-white"> Manage Users </a>
            <button use:inertia={{ href: '/logout', method: 'post' }} class="block w-full px-6 py-2 text-left hover:bg-indigo-500 hover:text-white"> Logout </button>
          </div>
        </Dropdown>
      </div>
    </div>
    <div class="md:flex md:grow md:overflow-hidden">
      <MainMenu class="hidden w-56 shrink-0 overflow-y-auto bg-indigo-800 p-12 md:block" />
      <div class="px-4 py-8 md:flex-1 md:overflow-y-auto md:p-12" scroll-region>
        <FlashMessages />
        <slot />
      </div>
    </div>
  </div>
</div>
