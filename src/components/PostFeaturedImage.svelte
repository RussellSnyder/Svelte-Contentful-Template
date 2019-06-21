<style>
    img {
        width: 100%;
        height: auto;
    }
    .image-container {
            max-height: 200px;
            overflow: hidden;

    }
</style>

<script>
	export let featuredImage;
	export let isPreview = false;
</script>

<div class="image-container">
    {#await featuredImage}
        <img class:isPreview={isPreview} src="https://picsum.photos/1000/300" alt="placeholder">
    {:then featuredImage}
        <img class:isPreview={isPreview} src={featuredImage.src} alt={featuredImage.title}>
    {/await}
</div>
