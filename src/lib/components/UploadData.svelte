<script>
    import Button, { Label } from '@smui/button';
    import FormField from '@smui/form-field';
</script>

<style>
    .upload-input {
        display: none;
    }
    .upload-button {
        background-color: #4CAF50;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    }
</style>

<FormField>
    <div class="group">
      <label for="file" class="mdc-button">Upload your file</label>
      <input
        class="upload-input"
        type="file"
        id="file"
        name="fileToUpload"
        required
      />
    </div>
  
    <Button variant="outlined" color="secondary" type="submit">Submit</Button>
</FormField>