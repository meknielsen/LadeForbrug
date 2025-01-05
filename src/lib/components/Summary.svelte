<script>
// @ts-nocheck

    import { getChartYearData, getLatestDataDate, totalYear } from '$lib/chartData.js';
    import Icon from '@iconify/svelte';
    import { _active, _view } from '$lib/stores.js';
  
  let { data } = $props();

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
                        <div class="card w-120 bg-neutral text-neutral-content">
                            <div class="card-body items-center text-center">
                                <button class="btn btn-ghost min-w-40 m-2 hover:bg-neutral" size="xl" onclick={() => activeView(year)} onkeydown={() => activeView(year)}><h5 class="text-3xl font-bold tracking-tight">{year}</h5></button>
                                <div class="stats shadow">
                                    <div class="stat place-items-right">
                                        <div class="stat-figure text-primary">
                                            <Icon icon="mdi:home-lightning-bolt" class="w-8 h-8 me-2 text-primary" />
                                        </div>
                                        <div class="stat-title text-left">Total housing usage</div>
                                        <div class="stat-value text-primary">DKK {total(year)}</div>
                                    </div>
                                </div>
                                <div class="stats shadow">
                                    <div class="stat place-items-right">
                                        <div class="stat-figure text-secondary">
                                            <Icon icon="mdi:home-battery" class="w-8 h-8 me-2 text-secondary" />
                                        </div>
                                        <div class="stat-title text-left">Total charging usage</div>
                                        <div class="stat-value text-secondary">DKK {total_charging(year)}</div>
                                    </div>
                                </div>
                                <div class="stats shadow">
                                    <div class="stat place-items-right">
                                        <div class="stat-figure text-accent">
                                            <Icon icon="mdi:battery-charging-80" class="w-8 h-8 me-2 text-accent" />
                                        </div>
                                        <div class="stat-title text-left">Total payment</div>
                                        <div class="stat-value text-accent">DKK {total_pay(year)}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            {/each}
    </div>
</div>