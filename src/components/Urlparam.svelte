<script>
  export let email = ''
  /*const W = window || null
  if (W) {
    const params = new URLSearchParams(window.location.search)
    email = params.get('email')//.toString()
  }*/
  const _getprop = () => {
    const params = new URLSearchParams(window.location.search)
    email = params.get('email')//.toString()
    console.log('onload',{email})
  }
  console.log('onmount',{email})
</script>
<!--<svelte:window on:load={_getprop}/>-->
<input on:load={_getprop} id="email" name="email" type="email" required placeholder="* required" class="input input-bordered input-md flex-1 min-w-fit w-full" value={email}>
<!--<slot prop={email}></slot>-->