<script>
  import { onMount } from 'svelte'
  import fitTextarea from 'fit-textarea'
  import nanoid from 'nanoid'
  import Label from '@/Components/Form/Label.svelte'

  export let id = `textarea-input-${nanoid(5)}`
  export let label
  export let value
  export let autosize = false
  export let error

  let input

  export const focus = () => input.focus()
  export const select = () => input.select()

  $: props = {
    ...$$restProps,
    class: 'form-textarea',
  }

  onMount(() => {
    if (autosize) {
      fitTextarea.watch(input)
    }
  })

  function update(event) {
    value = event.target.value
  }
</script>

<div class={$$restProps.class}>
  <Label {label} {id} />

  <textarea {...props} bind:this={input} class:error {id} {value} on:input={update} />

  {#if error}
    <div class="form-error">{error}</div>
  {/if}
</div>
