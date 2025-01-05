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
{/if}
