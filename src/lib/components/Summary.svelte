<script>
// @ts-nocheck

    import { getChartYearData, getLatestDataDate, totalYear } from '$lib/chartData.js';
    import { Button, Card } from 'flowbite-svelte';
    import Icon from '@iconify/svelte';
    import { _active, _view } from '$lib/stores.js';
  
    export let data;

    let s = 0;
    let locale = 'da-DK';
    let refusion_sum = (y) => { s=0; data.refusion_data[`${y}`].forEach((el) => s += Number(el.replace(/,/g, '.'))); return s; };
    let years = Object.keys(data.years);

    let total = (y) => totalYear(data.years, `${y}`, 2)[0].toLocaleString(locale);
    let total_charging = (y) => totalYear(data.years, `${y}`, 2)[1].toLocaleString(locale);
    let total_pay = (y) => (totalYear(data.years, `${y}`, 2)[1] - refusion_sum(`${y}`)).toLocaleString(locale);

    let activeView = (y) => {
        $_active = 'year';
        $_view.year = y;
    }

    console.log('total: ' + total('2023'))
    console.log('total_charing: ' + total_charging('2023'))

</script>

<style>
</style>

<div class="container mx-auto p-10">
    <div class="flex flex-row">
            {#each years as year, _i}
                <div>
                    <div class="basis-3/12 p-2">
                        <Card class="min-w-60">
                            <Button class="min-w-32 m-2" size="xl" color="none" on:click={() => activeView(year)} on:keydown={() => activeView(year)}><h5 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">{year}</h5></Button>
                            <Button class="min-w-32 m-2" color="alternative"><Icon icon="mdi:home-lightning-bolt" style="color: rgba(54, 162, 235, 1)" class="w-6 h-6 me-2" />DKK {total(year)}</Button> 
                            <Button class="min-w-32 m-2" color="alternative"><Icon icon="mdi:home-battery" style="color: rgba(255, 99, 132, 1)" class="w-6 h-6 me-2" />DKK {total_charging(year)}</Button>
                            <Button class="min-w-32 m-2" color="alternative"><Icon icon="mdi:battery-charging-80" style="color: rgb(75, 192, 192)" class="w-6 h-6 me-2" />DKK {total_pay(year)}</Button>
                        </Card>
                    </div>
                </div>
            {/each}
    </div>
</div>