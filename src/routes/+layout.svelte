<script>
    import Icon from '@iconify/svelte';
</script>

<style>
</style>

<div class="container">
    <nav class="navbar" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
        <a class="navbar-item" href=".">
            <Icon icon="mdi:home-battery-outline" style="font-size: 36px" />
        </a>
        </div>

        <div id="navbarCharging" class="navbar-menu">
            <div class="navbar-start">
                <a class="navbar-item" href="/years">
                    Years
                </a>
                <a class="navbar-item" href="/months">
                    Months
                </a>
                <a class="navbar-item" href="/days">
                    Days
                </a>
            </div>
            <div class="navbar-end">    
            </div>
        </div>
    </nav>
    <slot />
</div>  