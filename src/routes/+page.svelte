<script>
// @ts-nocheck

    
    import Year from '$lib/components/Year.svelte'
    import Month from '$lib/components/Month.svelte'
    import Day from '$lib/components/Day.svelte'
    import Settings from '$lib/components/Settings.svelte'
    import Summary from '$lib/components/Summary.svelte'
    import UploadData from '$lib/components/UploadData.svelte'
    import {_data, _view, _active} from '$lib/stores.js';
    import { getChartYearData, getLatestDataDate } from '$lib/chartData.js';

    export let data;

    let detail_link;

    $_data = data;

</script>

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
    <Settings />
{/if}
{#if $_active === 'summary'}
    <Summary data={$_data}/>
{/if}
{#if $_active === 'load'}
    <UploadData/>
{/if}