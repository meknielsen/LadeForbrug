<script>
    // @ts-nocheck
    
      import "../app.pcss";
      import { _active, _view } from '$lib/stores.js';
      import Icon from '@iconify/svelte';
      import { onMount } from 'svelte';
    
      let isModalOpen = false;
      let openD = false;
      let btnClass = 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg ps-1 w-7';
      let popupAdd = false;
      let value;
      let loading = false;
    
      $_active = 'year';
      let activeView = (s) => {
        $_active = s;
      }

      let dropdown = () => document.activeElement.blur()
    
</script>
    
<style>
</style>

<div class="navbar bg-neutral text-neutral-content">
    <div class="navbar-start">
      <a href="/" class="btn btn-ghost text-xl" on:click={() => activeView('summary')} on:keydown={() => activeView('summary')}>Ladeforbrug</a>
    </div>
    <div class="navbar-center">
      <a class="btn btn-ghost" on:click={() => activeView('summary')}>Home</a>
      <a class="btn btn-ghost" on:click={() => activeView('year')}>År</a>
      <a class="btn btn-ghost" on:click={() => activeView('month')}>Måned</a>
      <!-- <a class="btn btn-ghost" on:click={() => activeView('day')}>Dag</a> -->
    </div>
    <div class="flex justify-end flex-1 px-2">
        <div class="flex items-stretch">
          <div class="dropdown dropdown-end" >
            <div tabindex="0" role="button" class="btn btn-ghost rounded-btn modal-button">
                <Icon icon="mdi:settings-outline" class="w-4 h-4 me-2" />
            </div>
            <ul tabindex="0" class="menu dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-52 mt-4">
              <li ><a on:click={() => activeView('settings')} on:click= {() => document.activeElement.blur()} on:keydown= {() => document.activeElement.blur()}>Settings</a></li> 
              <li ><a on:click={() => activeView('summary')} on:click= {() => document.activeElement.blur()} on:keydown= {() => document.activeElement.blur()}>Summary</a></li> 
              <li ><a onclick="load_data.showModal()">Load Data</a></li>
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
                            <!-- <hr class="my-6 border-gray-600 sm:mx-auto lg:my-8" /> -->
                            <button class="btn btn-primary min-w-20 mr-2" for='file-upload' on:click={() => (loading = true)} disabled="{value === undefined ? false : false}" >Add</button>
                            <button class="btn btn-accent min-w-20" on:click|preventDefault={() => load_data.close()}>Cancel</button>
                        </form>
                     </div>
                </div>
              </dialog>
            </ul>
          </div>
        </div>
    </div>
</div>

<div class="flexor-content">
    <slot></slot>
</div>