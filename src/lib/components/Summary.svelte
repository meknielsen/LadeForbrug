<script>
// @ts-nocheck

    import { getChartYearData, getLatestDataDate, totalYear } from '$lib/chartData.js';
    import { Button, Card } from 'flowbite-svelte';
    import Icon from '@iconify/svelte';
  
    export let data;

    let s = 0;
    let locale = 'da-DK';
    let refusion_sum = (y) => { s=0; data.refusion_data[`${y}`].forEach((el) => s += Number(el.replace(/,/g, '.'))); return s; };

    let total = (y) => totalYear(data.years, `${y}`, 2)[0].toLocaleString(locale);
    let total_charging = (y) => totalYear(data.years, `${y}`, 2)[1].toLocaleString(locale);
    let total_pay = (y) => (totalYear(data.years, `${y}`, 2)[1] - refusion_sum(`${y}`)).toLocaleString(locale);

</script>

<style>
</style>

<div class="container mx-auto p-10">
    <div class="flex flex-row">
            {#each ['2024', '2023'] as item, _i}
                <div>
                    <div class="basis-3/12 p-2">
                        <Card class="min-w-60">
                            <!-- <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{item}</h5> -->
                            <Button class="min-w-32 m-2" size="xl" color="none"><h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{item}</h5></Button>
                            <Button class="min-w-32 m-2" color="purple"><Icon icon="mdi:home" class="w-6 h-6 me-2" />DKK {total(item)}</Button> 
                            <Button class="min-w-32 m-2" color="red"><Icon icon="mdi:home-battery-outline" class="w-6 h-6 me-2" />DKK {total_charging(item)}</Button>
                            <Button class="min-w-32 m-2" color="green"><Icon icon="mdi:battery-charging-high" class="w-6 h-6 me-2" />DKK {total_pay(item)}</Button>
                        </Card>
                    </div>
                </div>
            {/each}
    </div>
</div>