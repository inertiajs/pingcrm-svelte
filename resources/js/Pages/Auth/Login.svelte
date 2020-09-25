<script>
  import { Inertia } from '@inertiajs/inertia'
  import { route } from '@/utils'
  import LoadingButton from '@/Shared/LoadingButton.svelte'
  import Logo from '@/Shared/Logo.svelte'
  import TextInput from '@/Shared/TextInput.svelte'

  export let errors = {}

  let sending = false
  let form = {
    email: 'johndoe@example.com',
    password: 'secret',
    remember: null,
  }

  function submit() {
    const data = {
      email: form.email,
      password: form.password,
      remember: form.remember,
    }

    Inertia.post(route('login.attempt'), data, {
      onStart: () => sending = true,
      onFinish: () => sending = false,
    })
  }
</script>

<svelte:head>
  <title>Login - Ping CRM</title>
</svelte:head>

<div class="p-6 bg-indigo-800 min-h-screen flex justify-center items-center">
  <div class="w-full max-w-md">
    <Logo class="block mx-auto w-full max-w-xs fill-white" height="50" />
    <form
      class="mt-8 bg-white rounded-lg shadow-xl overflow-hidden"
      on:submit|preventDefault={submit}>
      <div class="px-10 py-12">
        <h1 class="text-center font-bold text-3xl">Welcome Back!</h1>
        <div class="mx-auto mt-6 w-24 border-b-2" />
        <TextInput
          bind:value={form.email}
          error={errors.email}
          class="mt-10"
          label="Email:"
          type="email"
          autofocus
          autocapitalize="off" />
        <TextInput bind:value={form.password} class="mt-6" label="Password:" type="password" />
        <label class="mt-6 select-none flex items-center" for="remember">
          <input id="remember" bind:checked={form.remember} class="mr-1" type="checkbox" />
          <span class="text-sm">Remember Me</span>
        </label>
      </div>
      <div
        class="px-10 py-4 bg-gray-100 border-t border-gray-200 flex justify-between items-center">
        <a class="hover:underline" tabindex="-1" href="#reset-password">Forget password?</a>
        <LoadingButton bind:loading={sending} class="btn-indigo" type="submit">Login</LoadingButton>
      </div>
    </form>
  </div>
</div>
