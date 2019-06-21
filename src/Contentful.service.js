import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
// TODO make this secret in a .env file
const BASE_URL = 'https://cdn.contentful.com';

const SPACE_ID = 'pf777gvtpig6';
const ACCESS_TOKEN = 'YMoCozD4If0atTclUbawpcZLyCiuReu4gCI0OY_n7sg';
const ENVIRONMENT = 'master';

const CONTENT_TYPES = {
    POST: "post"
}

const allEntriesEndpoint = `/spaces/${SPACE_ID}/environments/${ENVIRONMENT}/entries?access_token=${ACCESS_TOKEN}`
const assetsEndpoint = `/spaces/${SPACE_ID}/environments/${ENVIRONMENT}/assets/`


function createContentTypeUrl(contentType) {
    return `${BASE_URL}${allEntriesEndpoint}&content_type=${contentType}`
}

function createAssetUrl(assetId) {
    return `${BASE_URL}${assetsEndpoint}${assetId}?access_token=${ACCESS_TOKEN}`
}

async function getAsset(assetID) {
    let res = await fetch(createAssetUrl(assetID))
    let body = await res.text()
    // console.log(body)
    let content = JSON.parse(body).fields
    let {title, file} = content;
    let {height, width} = file.details.image
    let src = file.url
    return ({title, height, width, src})
}

async function parsePost(post) {
    let {title, short, description, featuredImage} = post.fields;

    let parsedDescription = documentToHtmlString(description)
    let resolvedFeatureImage = await getAsset(featuredImage.sys.id)
    // console.log({resolvedFeatureImage})

    return {
        title,
        short,
        description: parsedDescription,
        featuredImage: resolvedFeatureImage
    }
}

async function parsePosts(posts) {
    const parsedPosts = posts.map(parsePost)
    return await Promise.all(parsedPosts)
}

async function getPosts() {
    const res = await fetch(createContentTypeUrl(CONTENT_TYPES.POST));
    const body = await res.text();
    const items = JSON.parse(body).items;
    const posts = await parsePosts(items);

    if (res.ok) {
        return posts;
    } else {
        throw new Error(items);
    }
}

export { getPosts }
