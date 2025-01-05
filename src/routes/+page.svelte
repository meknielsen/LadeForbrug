<script>
// @ts-nocheck
    import Year from '$lib/components/Year.svelte'
    import Month from '$lib/components/Month.svelte'
    import Day from '$lib/components/Day.svelte'
    import Settings from '$lib/components/Settings.svelte'
    import Summary from '$lib/components/Summary.svelte'
    // import UploadData from '$lib/components/UploadData.svelte'
    import {_data, _view, _active} from '$lib/stores.js';
    import { goto } from '$app/navigation';

  let { data } = $props();

    let detail_link;

    $_data = data;

    

</script>

<div class="hero bg-base-200 min-h-screen">
    <div class="hero-content text-center">
      <div class="max-w-md">
        <h1 class="text-5xl font-bold">Oversigt over Ladeforbrug </h1>
        <p class="py-6">
          Få et nemt og tydeligt oversigt over strømforbrug til elbil hjemmelader fra OK. 
        </p>
        <button class="btn btn-primary">Get Started</button>
      </div>
    </div>
</div>
