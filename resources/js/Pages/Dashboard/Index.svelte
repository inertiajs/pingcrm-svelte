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
