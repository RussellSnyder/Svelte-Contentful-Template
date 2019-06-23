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
<div class="card">
    <div class="card-image">
        <PostFeaturedImage featuredImage={featuredImage}/>
        <span class="card-title">{title}</span>
    </div>
    <div class="card-content">
        <p class="short">{short}</p>
    </div>
    <div class="card-action">
        <NavLink to={blogBase + slug}>to Post</NavLink>
    </div>
</div>
{:else}
<div class="col s12">
    <h3>{title}</h3>
    <PostFeaturedImage featuredImage={featuredImage}/>
    <div class="description">
        {@html description}
    </div>
</div>
{/if}
