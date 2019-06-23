# Svelte-Contentful-Template
Speed and Scalability for your web app

live at: http://clumsy-society.surge.sh/

## Background

With the move to more server side, static page rendering with React+Next (or Vue+Nuxt), there appears to be a trend moving away from run time to build time.
Svelte capitalizes on this fact.  it is a compiled framework optimzing code at build time instead of runtime.
Maybe it won't be the future, but in case it is, here's a template for using it with Contentful!

## Before we start

Learn about Svelte: https://svelte.dev
Learn about Contentful: contentful.com

Contentful is more than a headless CMS, it's an efficient way to get your data in and out of whatever app you are building.
In a nut shell, you create and populate custom content models and then call your data from an well documented API.
You were gonna make an API anyway, right?  Just let Contentful do it for you and go play outside :-D

## Technical Challenges

I decided to manually write the Contenful API requests instead of using the NPM package to better understand the API.
Svelte has great async await implementation, so I made extensive use of it.

## Gotchas Learned

- npm modules in Svelte don't work the same as with react.  Webpack is not rollup

- changing model names in contentful doesn't change the content id which was auto set when you created the model

- reload the svelte compiler often - sometimes errors occur that aren't noticed byu the watcher

- External css libraries are kinda hard to use.  Had to implement a precompiler for css

## Todo

- add server side routing in addition to client side.  Currently only works form home page entry '/'



