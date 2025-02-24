<script>
// @ts-nocheck

    import { months, numberString } from '$lib/utils.js';
    import Icon from '@iconify/svelte';
    import { _active, user } from '$lib/stores.svelte.js';
    import { run } from 'svelte/legacy';

    let { data } = $props();

    let refusion_data = [];

    let today = new Date();

    let year = $state(today.getFullYear().toString());
    let new_year = $state();

    let years = $state([]);
    let isDisabled = $state(true);

    // should be set to 'last year' if current year has no data
    // svelte-ignore state_referenced_locally
    let value = '2024';

    let open = false;
    let locale = 'DK';    
    let _values = $state(['0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0']);
    let popupDelete = false;
    let popupAdd = false;

    /**
     * Set the refusion data for the given year and month.
     * @param year Year
     * @param month Month
     */
    let set_refusion_data = async (y) => {
        await fetch(`api/settings/${y}/`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(refusion_data[y])
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
        get_refusion_data(y);
        year = value;
        years = years.filter(e => e.value !== `${y}`);
    }

    let get_refusion_data = async (y) => {
        refusion_data = await fetch(`api/settings/`).then((r) => r.json());
        for (let i = 0; i < Object.keys(refusion_data).length; i++ ) {
            years[i] = { value: Object.keys(refusion_data)[i], name: Object.keys(refusion_data)[i]}
            if ( Object.keys(refusion_data)[i] === y ) {
                for ( let j = 0; j < 12; j++ ){
                    if ( refusion_data[y][j] !== undefined ) {
                        _values[j] = refusion_data[y][j]
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
    }

    let activeView = (s) => {
        $_active = s;
    }

    let validate_input = (y) => {
        return !isNaN(y) && y.length === 4 && Number(y) >= 2020 && !Object.keys(refusion_data).includes(y);
    }

    function preventDefault(fn) {
        return function (event) {
            event.preventDefault();
            fn.call(this, event);
        };
    }

    run(() => get_refusion_data(year));
    run(() => update_refusion_data(_values));
    run(() => year = value); 

</script>
    
<style>

    .boxL {
        width: 130px;
        padding: 0px;
    }
    .boxM {
        width: 2rem;
        /* padding: 2rem; */
    }

    .test {
        width: 296px;
    }

</style>

<div class="border-2 mx-32 my-4 p-8 rounded-xl border-neutral">
    <div>{user.profile.name} {user.profile.surname}</div>    
</div>

<div class="border-2 mx-32 my-4 p-8 rounded-xl border-neutral">
    <div class="flex">
    <div class="border-neutral text-4xl m-1 w-32">{user.profile.chargers[0].name}</div>

            <a href={null} onclick={()=> info_modal.showModal()} onkeydown={()=> info_modal.showModal()}><Icon icon="mdi-light:alert-circle" class="w-5 h-5 mt-2" /></a>
            <dialog id="info_modal" class="modal">
            <div class="modal-box">
                <div class="modal-action">
                    <form method="dialog">
                        <span class="btn btn-active mb-2 w-32">Name: </span><span class="btn btn-outline w-80 ml-2">{user.profile.chargers[0].street}</span>
                        <span class="btn btn-active mb-2 w-32">Postal code: </span><span class="btn btn-outline w-80 ml-2">{user.profile.chargers[0].postcode}</span>
                        <span class="btn btn-active mb-2 w-32">City: </span><span class="btn btn-outline w-80 ml-2">{user.profile.chargers[0].city}</span>
                        <span class="btn btn-active mb-2 w-32">Charger id: </span><span class="btn btn-outline w-80 ml-2">{user.profile.chargers[0].charger_id}</span>
                        <button class="btn btn-primary my-2">Cancel</button>
                    </form>
                    </div>
                <!-- </div> -->
            </div>
            </dialog>
    </div>
    <div class="flex flex-row">
        <!-- <div class="basis-1/12 min-w-16 max-w-16"></div> -->
        <div class="basis-2/12 min-w-48 max-w-48">
            <div class="boxL">
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
        </div>
        <div class="basis-1/12 mt-8 min-w-24 max-w-24">
            <div class="boxM">
            <button class="btn-circle hover:base-100" onclick={()=> {addYear.showModal(); new_year =""}} ><Icon icon="mdi:plus-circle-outline" class="w-6 h-6 me-2 mt-3 ms-3" /></button>
            <dialog id="addYear" class="modal">
                <div class="modal-box w-72">
                    <h3 class="font-bold text-lg">Add Year</h3>
                    <div class="modal-action justify-start">
                        <form method="dialog">
                            <input type="text" name="add_year" class="input input-bordered w-full max-w-xs" placeholder="" bind:value={new_year} />
                            <p class="mt-2 text-xs {validate_input(new_year) ? 'text-green-600' : 'text-red-500'} font-light ml-1 p-0" >Must be a valid, non-existing year after 2020.</p>
                            <div class="flex h-10 pt-2 m-2 justify-center"></div>
                            <button class="btn btn-accent min-w-20 mr-2" onclick={() => add_year(new_year)} disabled={!isDisabled}>Add</button>
                            <button class="btn btn-primary min-w-20" onclick={() => addYear.close()}>Cancel</button>
                        </form>
                    </div>
                </div>
            </dialog>
            </div>
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
        <div class="basis-3/13"></div>
        <!-- <div class="basis-2/12">
        </div>
        <div class="basis-1/12">
            <button class="btn-circle hover:base-100" onclick={() => activeView('year')}>
                <Icon icon="mdi:close-circle-outline" class="w-6 h-6" />
            </button>
        </div>       -->
    </div>
    
    <div class="flex flex-row">
        <!-- <div class="basis-1/12 min-w-16 max-w-16"></div> -->
        <div class="basis-2/12 min-w-48 max-w-48"><div class="boxL"></div></div>
        <div class="basis-1/12 min-w-24 max-w-24"><div class="boxM"></div></div>
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
        <div class="basis-3/12"></div>
    </div>
    
    <div class="flex flex-row">
        <!-- <div class="basis-1/12 min-w-16 max-w-16"></div> -->
        <div class="basis-2/12 min-w-48 max-w-48"><div class="boxL"></div></div>
        <div class="basis-1/12 min-w-24 max-w-24"><div class="boxM"></div></div>
        <div class="basis-6/12 flex">
            <div class="m-1 p-1 pt-10 mr-6 w-12">
                <button class="btn btn-primary" onclick={()=>set_refusion_data(year)}>Save</button>
            </div>
            <div class="m-1 pt-10 w-12">
                <button class="btn btn-secondary" onclick={() => {deleteYear.showModal(); (new_year ="")}}>Delete</button>
                <dialog id="deleteYear" class="modal">
                    <div class="modal-box w-96">
                        <form method="dialog">
                            <!-- <p class="mb-5 text-md font-normal text-gray-400">This will delete the year {year} and all the monthly refusion data registered. </p> -->
                            <div role="alert" class="alert alert-warning mb-4">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  class="h-6 w-6 shrink-0 stroke-current"
                                  fill="none"
                                  viewBox="0 0 24 24">
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span><div class="font-bold">Warning!</div>This will delete the year {year} and all the monthly refusion data registered.</span>
                            </div>
                            <button class="btn btn-secondary me-2"onclick={() => (delete_year(year))}>Delete</button>
                            <button class="btn btn-primary" onclick={preventDefault(deleteYear.close())}>Cancel</button> 
                        </form>
                    </div>
                </dialog>
            </div>
        </div>
        <div class="basis-3/12"></div>
    </div>
</div>
