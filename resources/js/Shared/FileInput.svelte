<script>
  import { nanoid } from 'nanoid'
  import Label from '@/Shared/Label.svelte'

  export let id = `file-input-${nanoid(5)}`
  export let value
  export let label
  export let accept
  export let errors = []

  let files
  let input

  export const browse = () => input.click()

  $: props = {
    ...$$restProps,
    class: 'form-input p-0',
  }

  $: error = errors !== undefined && errors.length > 0

  $: value = files ? files[0] : null

  function filesize(size) {
    var i = Math.floor(Math.log(size) / Math.log(1024))
    return (size / Math.pow(1024, i)).toFixed(2) * 1 + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i]
  }

  function remove() {
    files = null
  }
</script>

<div class={$$restProps.class}>
  <Label {label} {id} />

  <div {...props} class:error>
    <input bind:this={input} bind:files class="hidden" type="file" {id} {accept} />

    {#if !value}
      <div class="p-2">
        <button
          type="button"
          class="px-4 py-1 bg-gray-500 hover:bg-gray-700 rounded-sm text-xs font-medium text-white"
          on:click={browse}>
          Browse
        </button>
      </div>
    {:else}
      <div class="flex items-center justify-between p-2">
        <div class="flex-1 pr-1">
          {value.name}
          <span class="text-gray-500 text-xs">({filesize(value.size)})</span>
        </div>
        <button
          type="button"
          class="px-4 py-1 bg-gray-500 hover:bg-gray-700 rounded-sm text-xs font-medium text-white"
          on:click={remove}>
          Remove
        </button>
      </div>
    {/if}
  </div>

  {#if error}
    <div class="form-error">{errors[0]}</div>
  {/if}
</div>
