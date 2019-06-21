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
    let content = JSON.parse(body).fields
    let {title, file, fileName, contentType} = content;
    let {height, width} = file.details.image
    let {src} = file
    return {
        title, fileName, contentType, height, width, src
    }
}

async function getPosts() {
    const res = await fetch(createContentTypeUrl(CONTENT_TYPES.POST));
    const body = await res.text();
    const items = JSON.parse(body).items
    const posts = await items.map(item => {
        let {title, short, description, featuredImage} = item.fields;

        let parsedDescription = documentToHtmlString(description)
        let resolvedFeatureImage = getAsset(featuredImage.sys.id)
        console.log(resolvedFeatureImage)
        return {
            title,
            short,
            description: parsedDescription,
            featuredImage: resolvedFeatureImage
        }
    })

    if (res.ok) {
        return posts;
    } else {
        throw new Error(items);
    }
}

export { getPosts }
