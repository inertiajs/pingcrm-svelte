<script>
  import { page } from '@inertiajs/inertia-svelte'

  let show = true

  function close() {
    show = false
  }
</script>

{#if $page.props.flash.success && show}
  <div class="mb-8 flex items-center justify-between bg-green-500 rounded max-w-3xl">
    <div class="flex items-center">
      <svg class="ml-4 mr-2 flex-shrink-0 w-4 h-4 fill-white" viewBox="0 0 20 20">
        <polygon points="0 11 2 9 7 14 18 3 20 5 7 18" />
      </svg>
      <div class="py-4 text-white text-sm font-medium">{$page.props.flash.success}</div>
    </div>
    <button type="button" class="group mr-2 p-2" on:click={close}>
      <svg
        class="block w-2 h-2 text-green-800 group-hover:text-green-900"
        width="235.908"
        height="235.908"
        viewBox="278.046 126.846 235.908 235.908">
        <path
          d="M506.784 134.017c-9.56-9.56-25.06-9.56-34.62 0L396
          210.18l-76.164-76.164c-9.56-9.56-25.06-9.56-34.62 0-9.56 9.56-9.56 25.06 0 34.62L361.38
          244.8l-76.164 76.165c-9.56 9.56-9.56 25.06 0 34.62 9.56 9.56 25.06 9.56 34.62 0L396
          279.42l76.164 76.165c9.56 9.56 25.06 9.56 34.62 0 9.56-9.56 9.56-25.06 0-34.62L430.62
          244.8l76.164-76.163c9.56-9.56 9.56-25.06 0-34.62z" />
      </svg>
    </button>
  </div>
{/if}

{#if $page.props.flash.error || (Object.keys($page.props.errors).length > 0 && show)}
  <div class="mb-8 flex items-center justify-between bg-red-400 rounded max-w-3xl">
    <div class="flex items-center">
      <svg class="ml-4 mr-2 flex-shrink-0 w-4 h-4 fill-white" viewBox="0 0 20 20">
        <path
          d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm1.41-1.41A8 8 0 1 0 15.66
          4.34 8 8 0 0 0 4.34 15.66zm9.9-8.49L11.41 10l2.83 2.83-1.41 1.41L10 11.41l-2.83
          2.83-1.41-1.41L8.59 10 5.76 7.17l1.41-1.41L10 8.59l2.83-2.83 1.41 1.41z" />
      </svg>
      {#if $page.props.flash.error}
        <div class="py-4 text-white text-sm font-medium">{$page.props.flash.error}</div>
      {:else}
        <div class="py-4 text-white text-sm font-medium">
          {#if Object.keys($page.props.errors).length === 1}
            <span>There is one form error.</span>
          {:else}
            <span>There are {Object.keys($page.props.errors).length} form errors.</span>
          {/if}
        </div>
      {/if}
    </div>
    <button type="button" class="group mr-2 p-2" on:click={close}>
      <svg
        class="block w-2 h-2 fill-red-800 group-hover:fill-white"
        width="235.908"
        height="235.908"
        viewBox="278.046 126.846 235.908 235.908">
        <path
          d="M506.784 134.017c-9.56-9.56-25.06-9.56-34.62 0L396
          210.18l-76.164-76.164c-9.56-9.56-25.06-9.56-34.62 0-9.56 9.56-9.56 25.06 0 34.62L361.38
          244.8l-76.164 76.165c-9.56 9.56-9.56 25.06 0 34.62 9.56 9.56 25.06 9.56 34.62 0L396
          279.42l76.164 76.165c9.56 9.56 25.06 9.56 34.62 0 9.56-9.56 9.56-25.06 0-34.62L430.62
          244.8l76.164-76.163c9.56-9.56 9.56-25.06 0-34.62z" />
      </svg>
    </button>
  </div>
{/if}
