import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import slugify from 'slugify'

// TODO make this secret in a .env file
const BASE_URL = 'https://cdn.contentful.com';

const SPACE_ID = 'pf777gvtpig6';
const ACCESS_TOKEN = 'YMoCozD4If0atTclUbawpcZLyCiuReu4gCI0OY_n7sg';
const ENVIRONMENT = 'master';

const CONTENT_TYPES = {
    POST: "post",
    PAGE: "page"
};

const PAGE_ENTRY_IDS = {
    ABOUT: "70T0i4KEuh3btjuphLOuTG",
    BLOG: "CXXZY3lSgDwgsRLmdF7lE",
    HOME: "2XrFh3awtYrRJN8t1eYJJ0"
}


const allEntriesEndpoint = `/spaces/${SPACE_ID}/environments/${ENVIRONMENT}/entries?access_token=${ACCESS_TOKEN}`
const assetsEndpoint = `/spaces/${SPACE_ID}/environments/${ENVIRONMENT}/assets/`
const entriesEndpoint = `/spaces/${SPACE_ID}/environments/${ENVIRONMENT}/entries/`


function createContentTypeUrl(contentType) {
    return `${BASE_URL}${allEntriesEndpoint}&content_type=${contentType}`
}

function createAssetUrl(assetId) {
    return `${BASE_URL}${assetsEndpoint}${assetId}?access_token=${ACCESS_TOKEN}`
}

function createEntryUrl(entryId) {
    return `${BASE_URL}${entriesEndpoint}${entryId}?access_token=${ACCESS_TOKEN}`
}


async function getImageAsset(assetID) {
    let res = await fetch(createAssetUrl(assetID))
    let body = await res.text()
    // console.log(body)
    let content = JSON.parse(body).fields
    let {title, file} = content;
    let {height, width} = file.details.image
    let src = file.url
    return ({title, height, width, src})
}

// todo parse image in seperate function

async function parsePost(post) {
    let {title, short, description, featuredImage} = post.fields;

    let parsedDescription = documentToHtmlString(description)
    let resolvedFeatureImage = await getImageAsset(featuredImage.sys.id)
    // console.log({resolvedFeatureImage})

    return {
        title,
        slug: slugify(title),
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
        console.log({posts})
        return posts;
    } else {
        throw new Error(items);
    }
}

function parsePage(fields) {
    let {title, description} = fields;

    return {
        title,
        description: documentToHtmlString(description),
    }
}

async function getPage(entryID) {
    const res = await fetch(createEntryUrl(entryID));
    const body = await res.text();
    const fields = JSON.parse(body).fields;
    const parsedPage = await parsePage(fields)
    console.log({parsedPage})
    if (res.ok) {
        return parsedPage;
    } else {
        throw new Error(fields);
    }
}

async function getHomePageData() {
    return getPage(PAGE_ENTRY_IDS.HOME)
}

async function getAboutPageData() {
    return getPage(PAGE_ENTRY_IDS.ABOUT)
}

async function getBlogPageData() {
    return getPage(PAGE_ENTRY_IDS.BLOG)
}

export { getPosts, getHomePageData, getAboutPageData, getBlogPageData }
