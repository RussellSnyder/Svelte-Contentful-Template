<script>
	import {getPosts} from "../Contentful.service";
    let posts = getPosts();
    import Post from './Post.svelte';
</script>

<div class="posts">
    {#await posts}
        <p>...waiting</p>
    {:then posts}
        {#each posts as post}
            <Post isPreview={true} {...post}/>
        {/each}
    {:catch error}
        <p style="color: red">{error.message}</p>
    {/await}
</div>
