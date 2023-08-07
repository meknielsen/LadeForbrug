<script>
    

    export let data;

    

</script>

{#each data.years['2023']['06']['10'] as hour}
    <p>{hour.price}</p>
{/each}
