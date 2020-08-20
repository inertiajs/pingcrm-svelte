<script>
  import { nanoid } from 'nanoid'
  import Label from '@/Shared/Label.svelte'

  export let id = `text-input-${nanoid(5)}`
  export let type = 'text'
  export let errors = []
  export let value
  export let label

  $: props = {
    ...$$restProps,
    class: 'form-input',
  }

  $: error = errors.length

  function update(event) {
    value = event.target.value
  }
</script>

<div class={$$restProps.class || ''}>
  <Label {label} {id} />

  <input
    {...props}
    class:error
    {id}
    {type}
    {value}
    on:input={update} />

  {#if error}
    <div class="form-error">{errors[0]}</div>
  {/if}
</div>
