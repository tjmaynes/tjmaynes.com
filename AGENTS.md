# AGENTS.md

Static Astro site for TJ Maynes's business automation consulting and professional AI coaching. Production is the Cloudflare Pages project `tjmaynes-site`. The public site builds without the private career repository.

## Setup

Use Node 24.20.0, pinned in `.node-version` and `.mise.toml`. `package.json` accepts `>=24.20.0 <25`. just is 1.58.0.

```sh
npm ci
```

## Commands

`just` is the task runner. `just` with no arguments runs `just check`.

| Command | What it does |
| --- | --- |
| `just dev` | Astro dev server |
| `just build` | Static build into `dist/` |
| `just preview` | Serve `dist/` |
| `just test` | `node --test tests/*.test.mjs` |
| `just check` | Build, then test. This is what CI runs after `npm ci`. |

Run `just check` after a change to pages, styles, booking, analytics, or theme behavior. Tests read `dist/` and the theme script in `src/layouts/SiteLayout.astro`, so a test-only run is not enough when the build output is stale.

## Where to edit

- `src/pages/index.astro`: homepage and the service choice.
- `src/pages/services/`: consulting, coaching, and the tutoring route.
- `src/pages/privacy.astro` and `src/pages/404.astro`.
- `src/layouts/SiteLayout.astro`: metadata, navigation, theme, and footer.
- `src/config/services.mjs`: discovery event, coaching price and length, and booking URLs.
- `src/components/`: booking callouts and analytics setup.
- `src/lib/analytics.mjs` and `src/scripts/analytics.js`: measurement rules.
- `src/styles/site.css`: layout, theme, and responsive rules.

## Writing

Write as TJ speaking to a prospective client. Use first person for his work and "we" for work he does with the client. State the work, fees, and practical arrangements directly. Keep tool names in the context of the work. Leave benefit slogans, feature catalogs, and repeated sales copy out.

## Contracts the tests enforce

- Discovery actions go to `https://cal.com/tjmaynes/15min` and use only `utm_source=tjmaynes.com`, `utm_medium=website`, campaign `home`, `consulting`, or `coaching`, and placement `header`, `hero`, or `contact`.
- `/services/tutoring/` redirects to `/services/coaching/` with status 301.
- The published `dist/` contains the public pages only. Career source, CV inputs, and private build files stay out.
- Theme starts from the system preference on each load. The toggle switches between light and dark. A manual choice holds until the next load, including when the system theme changes.
- Plausible stays off unless `PUBLIC_PLAUSIBLE_SCRIPT_URL` is an `https://plausible.io/js/pa-….js` script URL with no credentials, query, or fragment. Measurement runs only on `tjmaynes.com` and `www.tjmaynes.com`, and it must not block navigation.

## Publishing

The Check website workflow runs `npm ci` and `npm run check` on pull requests and `main`. Publishing is the separate manual Deploy website to Cloudflare workflow, and it runs only from `main`. Leave that workflow, Cloudflare Git deploys, DNS, and the `tjmaynes-site` project as they are. Do not run `npm run deploy` from an agent session.
