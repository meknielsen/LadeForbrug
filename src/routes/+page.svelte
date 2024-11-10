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

</script>

No data here
