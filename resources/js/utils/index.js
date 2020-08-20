export function isEnterKey(e) {
  return e.keyCode && e.keyCode === 13
}

export function isEscKey(e) {
  return e.keyCode && e.keyCode === 27
}

export function route(...args) {
  return window.route(...args).url()
}