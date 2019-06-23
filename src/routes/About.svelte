<script >
    import PageHeader from '../components/PageHeader.svelte';
    import { getAboutPageData } from '../Contentful.service';

    const aboutPageData = getAboutPageData()
</script>


<PageHeader page={aboutPageData}/>
