<script>
    // @ts-nocheck
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import { user } from '$lib/stores.svelte.js';

    let { data } = $props();

    // Get the user profile information from shared object, - loaded in /ladeboks/layout.server.js
    user.profile = data.user;

    if ( data.user.chargers.length === 1 ) {
        onMount(() => {goto('/ladeboks/66e8546314ec1c4939f7bdda')})
    }

</script>

<!-- Only show details if more than on charger exists -->
{#if data.user.chargers.length > 1}

    <p>
        {user.data.name}
    </p>
    <p>
        {data.user.surname}
    </p>
    <p>
        {data.user.email}
    </p>
    <p>
        User id is:{data.user._id}
    </p>
    <p>
        Data is: {data.user.chargers[0].data_id}
    </p>
    <p>
        Refusion data is: {data.user.chargers[0].refusion_id}
    </p>
{:else}

<div class="hero bg-base-200 min-h-screen">
    <div class="hero-content text-center">
      <div class="max-w-md">
        <span class="loading loading-spinner loading-lg"></span>
      </div>
    </div>
</div>


{/if}


