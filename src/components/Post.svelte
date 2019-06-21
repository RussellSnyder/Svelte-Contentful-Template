<script>
    import NavLink from "./NavLink.svelte";
    import PostFeaturedImage from './PostFeaturedImage.svelte'

	export let title;
	export let short;
	export let description;
	export let slug;
	export let featuredImage;
	export let isPreview = false;
    export let blogBase = "blog/";
</script>

{#if isPreview}
<div>
    <h3>{title}</h3>
    <PostFeaturedImage featuredImage={featuredImage}/>
    <p class="short">{short}</p>
    <NavLink to={blogBase + slug}>to Post</NavLink>
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
