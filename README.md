# Midrène's and Josua's Wedding

[![Test, build, push and deploy image](https://github.com/Sharknoon/wedding/actions/workflows/test-build-push-and-deploy-image.yml/badge.svg)](https://github.com/Sharknoon/wedding/actions/workflows/test-build-push-and-deploy-image.yml)

This is the website for our personal wedding. This site serves as a digital wedding invitation. Users can give a response, if they are participating on the wedding.

## Configuration

These environment variables configure your setup:

| Name                       | Description                                                                                                                                                                       | Required                     | Example / Default                                                                      |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- | -------------------------------------------------------------------------------------- |
| MONGODB_URL                | The connection to the database                                                                                                                                                    | yes                          | mongodb://&lt;username&gt;:&lt;password&gt;@&lt;host&gt;:&lt;port&gt;/&lt;database&gt; |
| PUBLIC_GOOGLE_MAPS_API_KEY | A Google Maps API Key from [Google Cloud](https://console.cloud.google.com/marketplace/product/google/maps-embed-backend.googleapis.com) to display a map of the wedding location | no                           | SDLKFALSFJKSJGAshAHaYeSMKWvrekl2MERK342                                                |
| ADMIN_LOGIN                | The credendials of the Admin panel. **IT IS STRONGLY ADVISED TO CHANGE THIS SETTING**                                                                                             | no, but strongly recommended | admin:admin                                                                            |
| PUBLIC_TRACKING_SCRIPT     | You can get some privacy-friendly analytics by using Plausible or Umami. Just copy the `<script>...</script>` from the Tracking Provider                                          | no                           | <script src=... data-domain=...></script>                                              |

## Docker

The environment variable `MONGODB_URL` is needed to start the container.

```bash
docker run -d -p 3000:3000 -e MONGODB_URL=<mongodb-url> -e ADMIN_LOGIN=<admin-login> ghcr.io/sharknoon/wedding
```

## Docker Compose

When starting the app with `docker compose`, all environment variables are optional.

```bash
ADMIN_LOGIN=<admin-login> docker compose up
```

---

## Developing

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
