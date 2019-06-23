# Svelte-Contentful-Template
Speed and Scalability for your web app

## Before we start

### Learn about Svelte: https://svelte.dev

Why are we doing so much stuff at build time.  Compile time makes waaaaay more sense.  
React is moving this direction - Next, static compiling, server side rendering, etc...
Why not use more low level javascript?  Why be so dependent on Frameworks?

### Learn about Contentful: contentful.com

We need data for any app, but where should that data live?  
Contentful is more than a headless CMS, it's an efficient way to get your data in and out of whatever app you are building.
In a nut shell, you use a beautiful web app to create and populate custom content models and then call your data from an auto generated API.
You were gonna make an API anyway, right?  Just let Contentful do it for you and go play outside :-D


## Gotchas

npm modules in Svelte don't work somehow, so we did contentful api mainplatoin directly

contentful changing model names - doesn't always change the content if

reload the svelte compiler often - sometimes errors occur that aren't noticed byu the watcher

External css libraries are kinda hard to use....

## Todo

- client side routing leads to styles not being injected properly - switch to server side routing
- Fetch pages seperately and have a better key-value system



