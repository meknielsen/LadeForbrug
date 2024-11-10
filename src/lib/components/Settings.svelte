<script>
// @ts-nocheck

    import { months, numberString } from '$lib/utils.js';
    import Icon from '@iconify/svelte';
    import { _active } from '$lib/stores.js';

    export let data;

    let refusion_data = [];
    let today = new Date();
    let year = today.getFullYear().toString();
    let new_year = '';
    let value = year;
    let years = [];
    let open = false;
    let locale = 'DK';    
    let _values = ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0']
    let popupDelete = false;
    let popupAdd = false;
    let isDisabled = true;

    /**
     * Set the refusion data for the given year and month.
     * @param year Year
     * @param month Month
     */
    let set_refusion_data = async (year) => {
        await fetch(`api/settings/${year}/`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(refusion_data[year])
        });
    }

    let add_year = async (y) => {
        get_refusion_data(y);
        await fetch(`api/settings/${y}/`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify([])
        });
        get_refusion_data(y);
        year = y;
    }

    let delete_year = async (y) => {
        await fetch(`api/settings/${y}/`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json'
            },
        });
        value = today.getFullYear().toString();
        get_refusion_data(y);
        year = value;
        years = years.filter(e => e.value !== `${y}`);
    }

    let get_refusion_data = async (year) => {
        refusion_data = await fetch(`api/settings/`).then((r) => r.json());
        for (let i = 0; i < Object.keys(refusion_data).length; i++ ) {
            years[i] = { value: Object.keys(refusion_data)[i], name: Object.keys(refusion_data)[i]}
            if ( Object.keys(refusion_data)[i] === year ) {
                for ( let j = 0; j < 12; j++ ){
                    if ( refusion_data[year][j] !== undefined ) {
                        _values[j] = refusion_data[year][j]
                    } else {
                        _values[j] = '0,00'
                    }
                }
            }
        }
    }

    let update_refusion_data = (d) => {
        let values = [];
        for ( let i= 0; i < 12; i++ ) {
            if ( d[i] == "" ) {
                values[i] = "0,00";
            } else {
                values[i] = d[i];
            }
        }
        data.refusion_data[year] = refusion_data[year] = values;
        // data.refusion_data[year] = values
    }

    let activeView = (s) => {
        $_active = s;
    }

    let validate_input = (y) => {
        isDisabled = !isNaN(y) && y.length === 4 && Number(y) >= 2020 && !Object.keys(refusion_data).includes(y);
        return isDisabled;
    }

    $: get_refusion_data(year);
    $: update_refusion_data(_values)
    $: year = value; 

</script>

<style>
</style>

<div class="flex flex-row pt-16">
    <div class="basis-1/12"></div>
    <div class="basis-1/12 min-w-32">
        <label for="search" class="block w-32">
            <div class="label">
                <span class="label-text">Select year</span>
            </div>
            <select class="select select-bordered w-full max-w-xs" bind:value={year}>
                {#each years as year}
                <option>{year.name}</option>
                {/each}
              </select>
        </label>
    </div>
        <div class="basis-1/12 mt-8 min-w-16">
        <button class="btn-circle hover:base-100" onclick="addYear.showModal()" on:click={() => (new_year ="")}><Icon icon="mdi:plus-circle-outline" class="w-6 h-6 me-2 mt-3 ms-3" /></button>
        <dialog id="addYear" class="modal">
            <div class="modal-box  w-96">
                <h3 class="font-bold text-lg">Add Year</h3>
                <div class="modal-action justify-start">
                    <form method="dialog">
                        <input type="text" name="add_year" class="input input-bordered w-full max-w-xs" placeholder="" bind:value={new_year} />
                        <p class="mt-2 text-xs {validate_input(new_year) ? 'text-green-600' : 'text-red-500'} font-light ml-1 p-0" >Must be a valid, non-existing year after 2020.</p>
                        <div class="flex h-10 pt-2 m-2 justify-center"></div>
                        <button class="btn btn-primary min-w-20 mr-2" on:click={() => add_year(new_year)} disabled={!isDisabled}>Add</button>
                        <!-- svelte-ignore missing-declaration -->
                        <button class="btn btn-accent min-w-20" on:click|preventDefault={() => addYear.close()}>Cancel</button>
                    </form>
                </div>
            </div>
        </dialog>
    </div>
    <div class="basis-6/12 flex">
        {#each months({locale}) as month, index (index)}
            {#if index<6}
            <div class="p-1 min-w-28">
                <label class="form-control w-full max-w-xs mb-2" for="input-sm">
                    <div class="label">
                        <span class="label-text">{month}</span>
                    </div>
                    <input class="input input-bordered w-full max-w-xs" id="input-sm" type="text" placeholder="0,00" bind:value={_values[index]}/>
                </label>
            </div>
            {/if}
        {/each}
    </div>
    <div class="basis-2/12">
    </div>
    <div class="basis-1/12">
        <button class="btn-circle hover:base-100" on:click={() => activeView('year')}>
            <Icon icon="mdi:close-circle-outline" class="w-6 h-6" />
        </button>
    </div>
</div>

<div class="flex flex-row">
    <div class="basis-1/12"></div>
    <div class="basis-1/12 min-w-32"></div>
    <div class="basis-1/12 min-w-16"></div>
    <div class="basis-6/12 flex">
        {#each months({locale}) as month, index (index)}
            {#if index>5}
                <div class="p-1 min-w-28">
                    <label class="form-control w-full max-w-xs mb-2" for="input-sm">
                        <div class="label">
                            <span class="label-text">{month}</span>
                        </div>
                        <input class="input input-bordered w-full max-w-xs" id="input-sm" type="text" placeholder="0,00" bind:value={_values[index]}/>
                    </label>
                </div>
            {/if}
        {/each}
    </div>
    <div class="basis-3/12">
    </div>
</div>

<div class="flex flex-row">
    <div class="basis-1/12"></div>
    <div class="basis-1/12 min-w-32"></div>
    <div class="basis-1/12 min-w-16"></div>
    <div class="basis-1/12 flex">
        <div class="m-1 p-1 pt-10 mr-6 w-12">
            <button class="btn btn-primary" on:click={()=>set_refusion_data(year)}>Save</button>
        </div>
        <div class="m-1 pt-10 w-12">
            <!-- <button class="btn btn-secondary" on:click={() => (popupDelete = true)}>Delete</button> -->
            <button class="btn btn-secondary" onclick="deleteYear.showModal()" on:click={() => (new_year ="")}>Delete</button>
            <dialog id="deleteYear" class="modal">
                <div class="modal-box  w-96">
                    <form method="dialog">
                        <h3 class="mb-5 text-lg font-normal text-gray-400">This will delete the year {year} and all the monthly refusion data registered. </h3>
                        <button class="btn btn-secondary me-2"on:click={() => (delete_year(year))}>Delete</button>
                        <!-- svelte-ignore missing-declaration -->
                        <button class="btn btn-primary" on:click|preventDefault={() => deleteYear.close()}>Cancel</button> 
                    </form>
                </div>
            </dialog>
        </div>
    </div>
    <div class="basis-8/12"></div>
</div>

 


