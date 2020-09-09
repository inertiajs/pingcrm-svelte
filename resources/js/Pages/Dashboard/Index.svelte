<script context="module">
  import Layout, { title } from '@/Shared/Layout.svelte'
  export const layout = Layout
</script>

<script>
  import { inertia } from '@inertiajs/inertia-svelte'

  $title = 'Dashboard'
</script>

<h1 class="mb-8 font-bold text-3xl">Dashboard</h1>
<p class="mb-8 leading-normal">
  Hey there! Welcome to Ping CRM, a demo app designed to help illustrate how <a
    class="text-indigo-500 underline hover:text-orange-600"
    href="https://inertiajs.com">
    Inertia.js
  </a> works.
</p>
<div class="mb-8 flex">
  <a use:inertia href="/500" class="btn-indigo">500 error</a>
  <a use:inertia href="/404" class="btn-indigo ml-1">404 error</a>
</div>
<p class="leading-normal">
  👆 These links are intended to be broken to illustrate how error handling works with Inertia.js.
</p>
