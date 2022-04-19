<!-- markdownlint-disable MD041 -->
[![Build and deploy website](https://github.com/Sharknoon/wedding/actions/workflows/build-and-deploy-website.yml/badge.svg)](https://github.com/Sharknoon/wedding/actions/workflows/build-and-deploy-website.yml)

# Midrène's and Josua's Wedding

This is the website for our personal wedding. This site serves as a digital wedding invitation. Users can give a response, if they are participating on the wedding.

## Docker

Two environment variables are needed to start the container.
|Name|Required|Example|
|-|-|-|
|MONGODB_URL|yes|mongodb://&lt;username&gt;:&lt;password&gt;@&lt;host&gt;:&lt;port&gt;/myFirstDatabase|
|GOOGLE_MAPS_API_KEY|yes|SDLKFALSFJKSJGAshAHaYeSMKWvrekl2MERK345|

```bash
docker run -d -p 3000:3000 -e VITE_MONGODB_URL=<mongodb-url> -e VITE_GOOGLE_MAPS_API_KEY=<google-maps-api-key> ghcr.io/sharknoon/wedding
```

---

## Development

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/master/packages/create-svelte).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npm init svelte@next

# create a new project in my-app
npm init svelte@next my-app
```

> Note: the `@next` is temporary

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
