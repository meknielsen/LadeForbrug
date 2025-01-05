<!-- @migration-task Error while migrating Svelte code: Event attribute must be a JavaScript expression, not a string
https://svelte.dev/e/attribute_invalid_event_handler -->
<script>
  // @ts-nocheck
    
    import "../app.pcss";
    import { _active, _view } from '$lib/stores.js';
    import Icon from '@iconify/svelte';
  /**
   * @typedef {Object} Props
   * @property {import('svelte').Snippet} [children]
   */

  /** @type {Props} */
  let { children } = $props();
    
  let isModalOpen = false;
  let openD = false;
  let btnClass = 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg ps-1 w-7';
  let popupAdd = false;
  let value = $state();
  let loading = $state(false);

  $_active = 'year';
  let activeView = (s) => {
    $_active = s;
  }

  let dropdown = () => document.activeElement.blur();

  function preventDefault(fn) {
    return function (event) {
      event.preventDefault();
      fn.call(this, event);
    };
  }
    
</script>
    
<style>
</style>

<div class="navbar bg-neutral text-neutral-content">
    <div class="navbar-start">
      <a href="/" class="btn btn-ghost text-xl" >Ladeforbrug</a>
    </div>
    <div class="navbar-center">
      <a class="btn btn-ghost" href={null} onclick={() => activeView('summary')} onkeydown={() => activeView('summary')}>Home</a>
      <a class="btn btn-ghost"href={null} onclick={() => activeView('year')}>År</a>
      <a class="btn btn-ghost" href={null} onclick={() => activeView('month')}>Måned</a>
      <!-- <a class="btn btn-ghost" on:click={() => activeView('day')}>Dag</a> -->
    </div>

    <!-- Dropdown logic START ... -->
    <div class="flex justify-end flex-1 px-2">
        <div class="flex items-stretch">
          <div class="dropdown dropdown-end" >
            <div tabindex="0" role="button" class="btn btn-ghost rounded-btn modal-button">
                <Icon icon="mdi:settings-outline" class="w-4 h-4 me-2" />
            </div>
            <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
            <ul tabindex="0" class="menu dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-52 mt-4">
              <li ><a href={null} onclick={() => { activeView('settings'); onclick= () => document.activeElement.blur()}} onkeydown= {() => document.activeElement.blur()}>Settings</a></li> 
              <li><a href={null} onclick={() => { activeView('summary'); document.activeElement.blur(); }} onkeydown={() => document.activeElement.blur()}>Summary</a></li>
              <!-- UPLOAD file section -->
              <li ><a href={null} onclick={() => load_data.showModal()}>Load Data</a></li>
              <dialog id="load_data" class="modal" >
                <div class="modal-box">
                    <h3 class="font-bold text-lg">Upload file</h3>
                    <div class="modal-action justify-center">
                        <form method="post" enctype="multipart/form-data" class="w-full">
                            <input id='file-upload' type="file" name='file' accept='.csv' class="file-input  w-full max-w-xs" bind:value />
                            <div class="flex h-10 pt-2 m-2 justify-center">
                                {#if loading}
                                    <span class="loading loading-dots text-primary"></span>
                                {/if}
                            </div>
                            <hr class="my-6 border-gray-600 sm:mx-auto lg:my-8" />
                            <button class="btn btn-primary min-w-20 mr-2" for='file-upload' onclick={() => (loading = true)} disabled="{value === undefined ? false : false}" >Add</button>
                            <button class="btn btn-accent min-w-20" onclick={preventDefault(load_data.close())}>Cancel</button>
                            <!-- <button class="btn btn-accent min-w-20" onclick={(e) => {preventDefault(e); load_data.close()}}>Cancel</button> -->
                        </form>
                     </div>
                </div>
              </dialog>
            </ul>
          </div>
        </div>
    </div>
    <!-- Dropdown logic END ... -->
</div>

<div class="flexor-content">
    {@render children?.()}
</div>