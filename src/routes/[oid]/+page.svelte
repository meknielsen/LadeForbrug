<script>
// @ts-nocheck
    import Year from '$lib/components/Year.svelte'
    import Month from '$lib/components/Month.svelte'
    import Day from '$lib/components/Day.svelte'
    import Settings from '$lib/components/Settings.svelte'
    import Summary from '$lib/components/Summary.svelte'
    // import UploadData from '$lib/components/UploadData.svelte'
    import {_data, _view, _active} from '$lib/stores.js';

    let { data } = $props();

    let detail_link = $state();
    
    

    $_data = data;

    console.log($_data.loggedIn)

    if ( Object.keys($_data.refusion_data).length === 0) console.log('no refusion data')

</script>

<!-- Logic if no account -->



<!-- End  -->

{#if Object.keys($_data.refusion_data).length !== 0}
    {#if $_active === 'year'}
        <Year data={$_data} bind:detail_link/>
    {/if}
    {#if $_active === 'month'}
        <Month data={$_data} bind:detail_link/>
    {/if}
    {#if $_active === 'day'}
        <Day data={$_data} bind:detail_link/>
    {/if}
    {#if $_active === 'settings'}
        <Settings data={$_data}/>
    {/if}
    {#if $_active === 'summary'}
        <Summary data={$_data}/>
    {/if}
{:else}
    <div class="container mx-auto px-60 ">
        <div role="alert" class="alert shadow-lg mt-80">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                class="stroke-info h-8 w-8 shrink-0">
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <div>
                <div class="font-base text-lg">Info !
                No data was found for the homecharger.  </div>
            </div>
            <a href="/">
                <button href="/" class="btn btn-active btn-primary btn-md">Cancel</button>
            </a>
        </div>
    </div>
{/if}
