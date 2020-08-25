<script>
  import { nanoid } from 'nanoid'
  import Label from '@/Shared/Label.svelte'

  export let id = `text-input-${nanoid(5)}`
  export let value
  export let label
  export let type = 'text'
  export let errors = []

  let input

  export const focus = () => input.focus()
  export const select = () => input.select()

  $: props = {
    ...$$restProps,
    class: 'form-input',
  }

  $: error = errors !== undefined && errors.length > 0

  function update(event) {
    value = event.target.value
  }
</script>

<div class={$$restProps.class}>
  <Label {label} {id} />

  <input {...props} bind:this={input} class:error {id} {type} {value} on:input={update} />

  {#if error}
    <div class="form-error">{errors[0]}</div>
  {/if}
</div>
