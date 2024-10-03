<script>
// @ts-nocheck
    import Year from '$lib/components/Year.svelte'
    import Month from '$lib/components/Month.svelte'
    import Day from '$lib/components/Day.svelte'
    import Settings from '$lib/components/Settings.svelte'
    import Summary from '$lib/components/Summary.svelte'
    // import UploadData from '$lib/components/UploadData.svelte'
    import {_data, _view, _active} from '$lib/stores.js';

    export let data;

    let detail_link;

    $_data = data;

    // let test = {'2023': {'10': {'01': [{'price': '01'}, {'price': '02'}, {'price': '03'}, {'price': '04'}]}}}
    // console.log(test['2023']['10'])
    // test = {'2023': {'10': {'01': [{'price': '05'}, {'price': '06'}, {'price': '07'}]}}}
    // console.log(test['2023']['10'])

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


<!-- {test['2023']['10']} -->