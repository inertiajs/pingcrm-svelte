<script>
  export let id
  export let label

  $: props = {
    ...$$restProps,
    class: `form-label ${$$restProps.class || ''}`,
  }
</script>

{#if label}
  <label {...props} for={id}>{label}</label>
{/if}
