<!-- markdownlint-disable MD041 -->

[![Build, push and deploy image](https://github.com/Sharknoon/wedding/actions/workflows/build-push-and-deploy-image.yml/badge.svg)](https://github.com/Sharknoon/wedding/actions/workflows/build-push-and-deploy-image.yml)

# Midrène's and Josua's Wedding

This is the website for our personal wedding. This site serves as a digital wedding invitation. Users can give a response, if they are participating on the wedding.

## Configuration

These environment variables configure your setup:

| Name                       | Required                       | Example / Default                                                                     |
| -------------------------- | ------------------------------ | ------------------------------------------------------------------------------------- |
| MONGODB_URL                | yes                            | mongodb://&lt;username&gt;:&lt;password&gt;@&lt;host&gt;:&lt;port&gt;/myFirstDatabase |
| PUBLIC_GOOGLE_MAPS_API_KEY | yes                            | SDLKFALSFJKSJGAshAHaYeSMKWvrekl2MERK342                                               |
| ADMIN_LOGIN                | no, but strongly recommended   | admin:admin                                                                           |
| PUBLIC_PLAUSIBLE_URL       | no, only if you want analytics | https://plausible.yourdomain.com                                                      |

## Docker

The two environment variables `MONGODB_URL` and `PUBLIC_GOOGLE_MAPS_API_KEY` are needed to start the container.

```bash
docker run -d -p 3000:3000 -e MONGODB_URL=<mongodb-url> -e PUBLIC_GOOGLE_MAPS_API_KEY=<google-maps-api-key> -e ADMIN_LOGIN=<admin-login> ghcr.io/sharknoon/wedding
```

## Docker Compose

When starting the app with `docker compose`, only the `PUBLIC_GOOGLE_MAPS_API_KEY` variable is required, all other environment variables are optional.

```bash
PUBLIC_GOOGLE_MAPS_API_KEY=<google-maps-api-key> docker compose up
```

---

## Development

Once you've cloned this project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

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
