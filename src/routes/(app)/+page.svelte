<script>
// @ts-nocheck
  import Year from '$lib/components/Year.svelte'
  import Month from '$lib/components/Month.svelte'
  import Day from '$lib/components/Day.svelte'
  import Settings from '$lib/components/Settings.svelte'
  import Summary from '$lib/components/Summary.svelte'
  // import UploadData from '$lib/components/UploadData.svelte'
  import {_data, _view, _active, user} from '$lib/stores.svelte.js';
  import { goto } from '$app/navigation';

  let { data } = $props();

  let detail_link;

  $_data = data;

  // For testing of login logic
  let loggedIn = false;

</script>

<div class="hero bg-base-200 min-h-screen">
    <div class="hero-content text-center">
      <div class="max-w-md">
        <h1 class="text-5xl font-bold">Oversigt over Ladeforbrug </h1>
        <p class="py-6">
          Få et nemt og tydeligt oversigt over strømforbrug til elbil hjemmelader fra OK. 
        </p>
        <div class="flex justify-center space-x-4">
          <button class="btn btn-primary">Register</button>
          <form method="POST" action = "?/login">
            <button class="btn btn-accent">Login</button>
          </form>

          <!-- <form method="POST" action="/logout">
            <button>log out</button>
          </form> -->
        </div>
        
      </div>
    </div>
</div>





