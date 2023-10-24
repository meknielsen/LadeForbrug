<script>
	/** @type {import('./$types').PageData} */

	import Icon from '@iconify/svelte';
	import Year from "$lib/components/Year.svelte";

    export let data;

</script>

<style>
</style>

<Year {data} />