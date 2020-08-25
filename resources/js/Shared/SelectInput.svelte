<script>
  import { createEventDispatcher } from 'svelte'
  import { nanoid } from 'nanoid'
  import Label from '@/Shared/Label.svelte'

  export let id = `select-input-${nanoid(5)}`
  export let value
  export let label
  export let errors = []

  let input

  export const focus = () => input.focus()

  $: props = {
    ...$$restProps,
    class: 'form-select',
  }

  $: error = errors !== undefined && errors.length > 0

  const dispatch = createEventDispatcher()

  function update(event) {
    dispatch('change', event)
    value = event.target.value
  }
</script>

<div class={$$restProps.class}>
  <Label {label} {id} />

  <select {...props} bind:this={input} class:error {id} {value} on:blur|preventDefault={update}>
    <slot selected={value} />
  </select>

  {#if error}
    <div class="form-error">{errors[0]}</div>
  {/if}
</div>
