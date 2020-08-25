<script>
  export let loading = false

  $: props = {
    ...$$restProps,
    class: `flex items-center ${$$restProps.class || ''}`,
  }
</script>

<button {...props} disabled={loading}>
  {#if loading}
    <div class="btn-spinner mr-2" />
  {/if}

  <slot />
</button>
