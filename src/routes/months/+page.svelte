<script>
	/** @type {import('./$types').PageData} */

	import Icon from '@iconify/svelte';
	import Month from "$lib/components/Month.svelte";

    export let data;

</script>

<style>
</style>

<Month {data} />