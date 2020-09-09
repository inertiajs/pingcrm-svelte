<script context="module">
  import { writable } from 'svelte/store'
  export const title = writable(null)
</script>

<script>
  import { inertia, page } from '@inertiajs/inertia-svelte'
  import { route } from '@/utils'
  import Dropdown from '@/Shared/Dropdown.svelte'
  import FlashMessages from '@/Shared/FlashMessages.svelte'
  import Icon from '@/Shared/Icon.svelte'
  import Logo from '@/Shared/Logo.svelte'
  import MainMenu from '@/Shared/MainMenu.svelte'

  $: user = $page.auth && $page.auth.user
</script>

<svelte:head>
  <title>{$title ? `${$title} - Ping CRM` : 'Ping CRM'}</title>
</svelte:head>

{#if user}
  <div class="flex flex-col">
    <div class="h-screen flex flex-col">
      <div class="md:flex flex-shrink-0">
        <div class="bg-indigo-900 md:flex-shrink-0 md:w-56 px-6 py-4 flex items-center justify-between md:justify-center">
          <a use:inertia href="/" class="mt-1">
            <Logo class="fill-white" width="120" height="28" />
          </a>
          <Dropdown class="md:hidden" placement="bottom-end">
            <svg class="fill-white w-6 h-6" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
            <div slot="dropdown" class="mt-2 px-8 py-4 shadow-lg bg-indigo-800 rounded">
              <MainMenu />
            </div>
          </Dropdown>
        </div>
        <div class="bg-white border-b w-full p-4 md:py-0 md:px-12 text-sm md:text-md flex justify-between items-center">
          <div class="mt-1 mr-4">{user.account.name}</div>
          <Dropdown class="mt-1" placement="bottom-end">
            <div class="flex items-center cursor-pointer select-none group">
              <div class="text-gray-700 group-hover:text-indigo-600 focus:text-indigo-600 mr-1 whitespace-no-wrap">
                <span>{user.first_name}</span>
                <span class="hidden md:inline">{user.last_name}</span>
              </div>
              <Icon
                name="cheveron-down"
                class="w-5 h-5 group-hover:fill-indigo-600 fill-gray-700 focus:fill-indigo-600" />
            </div>
            <div slot="dropdown" class="mt-2 py-2 shadow-xl bg-white rounded text-sm">
              <a
                use:inertia
                href={route('users.edit', user.id)}
                class="block px-6 py-2 hover:bg-indigo-500 hover:text-white">
                My Profile
              </a>
              <a
                use:inertia
                href={route('users')}
                class="block px-6 py-2 hover:bg-indigo-500 hover:text-white">
                Manage Users
              </a>
              <a
                use:inertia={{ method: 'post' }}
                href={route('logout')}
                class="block px-6 py-2 hover:bg-indigo-500 hover:text-white">
                Logout
              </a>
            </div>
          </Dropdown>
        </div>
      </div>
      <div class="flex flex-grow overflow-hidden">
        <MainMenu class="bg-indigo-800 flex-shrink-0 w-56 p-12 hidden md:block overflow-y-auto" />
        <div class="flex-1 px-4 py-8 md:p-12 overflow-y-auto" scroll-region>
          <FlashMessages />
          <slot />
        </div>
      </div>
    </div>
  </div>
{/if}
