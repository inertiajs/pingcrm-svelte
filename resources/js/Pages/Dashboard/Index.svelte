<script context="module">
  import Layout, { title } from '@/Shared/Layout.svelte'
  export const layout = Layout
</script>

<script>
  $title = 'Dashboard'
</script>

<h1 class="mb-8 text-3xl font-bold">Dashboard</h1>
<p class="mb-8 leading-normal">
  Hey there! Welcome to Ping CRM, a demo app designed to help illustrate how <a class="text-indigo-500 underline hover:text-orange-600" href="https://inertiajs.com"> Inertia.js </a> works.
</p>
