import Layout from '@/Shared/Layout.svelte'
import { App } from '@inertiajs/inertia-svelte'
import { InertiaProgress } from '@inertiajs/progress'

InertiaProgress.init()

let el = document.getElementById('app')

new App({
  target: el,
  props: {
    initialPage: JSON.parse(el.dataset.page),
    resolveComponent: (name) => import(`@/Pages/${name}.svelte`),
  },
})
