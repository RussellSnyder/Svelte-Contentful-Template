<script>
	export let title;
	export let short;
	export let description;
	export let featuredImage;
	export let isPreview = false;

    import PostFeaturedImage from './PostFeaturedImage.svelte'
</script>

{#if isPreview}
<div>
    <h3>{title}</h3>
    <PostFeaturedImage featuredImage={featuredImage}/>
    <p class="short">{short}</p>
    <a href="">go to post =></a>
</div>
{:else}
<div>
    <h3>{title}</h3>
    <PostFeaturedImage featuredImage={featuredImage}/>
    <div class="description">
        {@html description}
    </div>
</div>
{/if}
