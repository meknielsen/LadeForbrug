<script>
// @ts-nocheck

    
    import Year from '$lib/components/Year.svelte'
    import Month from '$lib/components/Month.svelte'
    import Day from '$lib/components/Day.svelte'
    import {_data, _view, _active} from '$lib/stores.js';
    import { getChartYearData, getLatestDataDate } from '$lib/chartData.js';

    export let data;

    let detail_link;

    $_data = data;

    // $: $active;
    // $: if ( $active === 'year' ) detail_link = $_view.month;
    // $: if ( $active === 'month' ) detail_link = $_view.day;
    // $: console.log($_view)
</script>

<!-- <Year {$_data}/> -->
<!-- {data.years['2023']['06']['09'][0].price} -->

<!-- {#each $_data.years['2023']['06']['09'] as p}
    <div>{p.price}</div>
{/each} -->

{#if $_active === 'year'}
    <Year data={$_data} bind:detail_link/>
{/if}
{#if $_active === 'month'}
    <Month data={$_data} bind:detail_link/>
{/if}
{#if $_active === 'day'}
    <Day data={$_data} bind:detail_link/>
{/if}
