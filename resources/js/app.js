import { createInertiaApp } from '@inertiajs/inertia-svelte'
import { InertiaProgress } from '@inertiajs/progress'

InertiaProgress.init()

createInertiaApp({
  resolve: name => import(`@/Pages/${name}.svelte`),
  setup({ el, App, props }) {
    new App({ target: el, props })
  },
})
