<script>
  // @ts-nocheck
    
    import "../../app.pcss";
    let { children } = $props();
   
</script>
    
<style>
</style>

<div class="navbar bg-neutral text-neutral-content">
    <div class="navbar-start">
      <a href="/" class="btn btn-ghost text-xl" >Ladeforbrug</a>
    </div>


    <div class="flex justify-end flex-1 px-2">
      <div class="flex items-stretch">
        <!-- <div class="dropdown dropdown-end" > -->
          <!-- <div tabindex="0" role="button" class="btn btn-ghost rounded-full bg-accent text-primary-content"> -->
            <div tabindex="0" role="button" >
              <form method="POST" action = "?/login">
            <button class="btn btn-accent">Login</button>
          </form>
             <!-- <button class="btn btn-ghost bg-accent text-primary-content">Login</button> -->
              <!-- Login -->
          </div>
      </div>
  </div>

</div>

<div class="flexor-content">
    {@render children?.()}
</div>