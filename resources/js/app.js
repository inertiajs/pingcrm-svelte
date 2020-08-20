import { InertiaApp } from '@inertiajs/inertia-svelte'

let app = document.getElementById('app')

new InertiaApp({
  target: app,
  props: {
    initialPage: JSON.parse(app.dataset.page),
    resolveComponent: name =>
      import(`@/Pages/${name}.svelte`).then(module => module.default),
  },
})
