<script>
  import Popper from 'popper.js'
  import { onDestroy, tick } from 'svelte'
  import { isEscKey } from '@/utils'

  export let placement = 'bottom-end'
  export let boundary = 'scrollParent'
  export let autoclose = true

  let button
  let dropdown
  let portal
  let popper
  let show = false

  $: showDropdown(show)

  async function showDropdown(show) {
    if (show) {
      await tick()
      popper = new Popper(button, dropdown, {
        placement: placement,
        modifiers: {
          preventOverflow: { boundariesElement: boundary },
        },
      })

      document.body.appendChild(portal)
    } else if (popper) {
      await tick()
      popper.destroy()
    }
  }

  function keydown(e) {
    if (!isEscKey(e)) return

    show = false
  }

  onDestroy(() => {
    popper && popper.destroy()
    portal && document.body.removeChild(portal)
  })
</script>

<svelte:window on:keydown={keydown} />

<button {...$$restProps} bind:this={button} type="button" on:click={() => (show = true)}>
  <slot />
</button>

{#if show}
  <div bind:this={portal}>
    <div
      style="position: fixed; top: 0; right: 0; left: 0; bottom: 0; z-index: 99998; background:
      black; opacity: .2"
      on:click={() => (show = false)} />
    <div
      bind:this={dropdown}
      style="position: absolute; z-index: 99999;"
      on:click|stopPropagation={() => (show = autoclose ? false : true)}>
      <slot name="dropdown" />
    </div>
  </div>
{/if}
