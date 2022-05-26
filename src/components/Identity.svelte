<script>
  import { onMount } from 'svelte'
  import netlifyIdentity from 'netlify-identity-widget';
  export let bind, redirect, user
  //console.log('env.MODE:',import.meta.env.MODE)
  let visitor, consent
  
  onMount(() => {
    //if (bind) {
      netlifyIdentity.init({
        //showHeaders: false, /// TODO
        /*container: '#netlify-modal', // defaults to document.body
        locale: 'en' // defaults to 'en'*/
      })
    //}
    // Open the modal
    //netlifyIdentity.open();

    // Get the current user:
    // Available after on('init') is invoked
    user = netlifyIdentity.currentUser();
    if(window && !!redirect && !user) window.location = redirect

    // Bind to events
    netlifyIdentity.on('init', user => console.log('init', user));
    netlifyIdentity.on('login', user => {
      netlifyIdentity.close();
      visitor = user;
      netlifyIdentity.refresh().then((jwt)=>console.log(jwt))
      console.log('login', user)
    });
    netlifyIdentity.on('logout', () => {
      netlifyIdentity.close();
      user = null
      visitor = null
      console.log('logout', user)
    });
    netlifyIdentity.on('error', err => console.error('Error', err));
    //netlifyIdentity.on('open', () => console.log('Widget opened'));
    netlifyIdentity.on('close', () => {
      //console.log('Widget closed')
      /*user
      .update({ role: 'business' })
      .then((user) => console.log('Updated user %s', user))
      .catch((error) => {
        console.log('Failed to update user: %o', error);
        throw error;
      })*/
    });

    // Unbind from events
    //netlifyIdentity.off('login'); // to unbind all registered handlers
    //netlifyIdentity.off('login', handler); // to unbind a single handler

    // Close the modal
    //netlifyIdentity.close();

    // Log out the user
    //netlifyIdentity.logout();

    // Refresh the user's JWT
    // Call in on('login') handler to ensure token refreshed after it expires (1hr)  
    // Note: this method returns a promise.
    //netlifyIdentity.refresh().then((jwt)=>console.log(jwt))

    // Change language
    //netlifyIdentity.setLocale('en');

  });

  const signup = () => netlifyIdentity.open('signup')
  const login = () => netlifyIdentity.open('login')
  const logout = () => {
    netlifyIdentity.logout();
    consent = false
  }
  $: visitor = user
  //$: console.log('consent', consent)
</script>

{#if !!bind}
{#if !visitor}
<div class="card mx-auto w-fit shadow-xl image-full">
  <div class="card-body">
    <fieldset class="flex gap-8 my-4">
      <legend>Kérjük, rgisztráljon vagy jelentkezzen be!</legend>
      <button disabled={!consent} on:click={signup} tabindex="0" class="btn btn-primary flex-none">Regisztráció</button>
      <button on:click={login} tabindex="0" class="btn btn-primary flex-none">Bejelentkezés</button>
    </fieldset>
    <fieldset>
      <input id="consent" bind:checked={consent} name="consent" type="checkbox" required class="checkbox checkbox-xs" />
      <label for="consent">Elfogadom a </label><a href="https://www.urosystem.com/hu/privacy-policy" rel="external" target="_blank">Adatvédelmi nyilatkozatot</a>
    </fieldset>
  </div>
</div>
{/if}

{#if visitor}
<div class="card mx-auto w-fit shadow-xl image-full">
  <div class="card-body">
    <p class="text-center">Bejelentkezve: {visitor?.email}</p>
    <!--<h3 class="text-center">Please set up your Profile before placing your first order.</h3>-->
    <fieldset class="flex justify-center gap-8 my-4">
      <!--<a href="/profile?email={visitor.email}" tabindex="0" class="btn btn-primary flex-none">Profile</a>-->
      <a href="/letoltes?email={visitor.email}" tabindex="0" class="btn btn-primary flex-none">Képzési anyagok megtekintése</a>
    </fieldset>
    <fieldset>
      <label for="logout">vagy<br></label>
      <button id="logout" on:click={logout} tabindex="0" class="btn btn-ghost flex-none">Kijelentkezés</button>
    </fieldset>
  </div>
</div>
{/if}
{/if}
<!--
<h3>User: {user?.email}</h3>
<h3>Visitor: {visitor?.email}</h3>
-->
<style>
  /*:global(div.header) {
    display: none;
  }*/
</style>