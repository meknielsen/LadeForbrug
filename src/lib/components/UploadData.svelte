<script>
// @ts-nocheck

    import { Fileupload, Label } from 'flowbite-svelte';
    let value;

</script>

<style></style>


    <Label class="space-y-2 mb-2">
      <span>Upload file</span>
      <Fileupload class='border !p-0  dark:text-gray-400' bind:value />
    </Label>
    <Label>File: {value}</Label>
