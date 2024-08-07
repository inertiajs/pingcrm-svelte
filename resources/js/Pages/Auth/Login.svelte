<script>
  import { useForm } from '@inertiajs/svelte'
  import LoadingButton from '@/Shared/LoadingButton.svelte'
  import Logo from '@/Shared/Logo.svelte'
  import TextInput from '@/Shared/TextInput.svelte'

  let form = useForm({
    email: 'johndoe@example.com',
    password: 'secret',
    remember: false,
  })

  function login() {
    $form.post('/login')
  }
</script>

<svelte:head>
  <title>Login - Ping CRM</title>
</svelte:head>

<div class="flex min-h-screen items-center justify-center bg-indigo-800 p-6">
  <div class="w-full max-w-md">
    <Logo class="mx-auto block w-full max-w-xs fill-white" height="50" />
    <form class="mt-8 overflow-hidden rounded-lg bg-white shadow-xl" on:submit|preventDefault={login}>
      <div class="px-10 py-12">
        <h1 class="text-center text-3xl font-bold">Welcome Back!</h1>
        <div class="mx-auto mt-6 w-24 border-b-2" />
        <TextInput bind:value={$form.email} error={$form.errors.email} class="mt-10" label="Email:" type="email" autofocus autocapitalize="off" />
        <TextInput bind:value={$form.password} class="mt-6" label="Password:" type="password" />
        <label class="mt-6 flex select-none items-center" for="remember">
          <input id="remember" bind:checked={$form.remember} class="mr-1" type="checkbox" />
          <span class="text-sm">Remember Me</span>
        </label>
      </div>
      <div class="flex border-t border-gray-100 bg-gray-100 px-10 py-4">
        <a class="hover:underline" tabindex="-1" href="#reset-password">Forgot password?</a>
        <LoadingButton bind:loading={$form.processing} class="btn-indigo ml-auto" type="submit">Login</LoadingButton>
      </div>
    </form>
  </div>
</div>
