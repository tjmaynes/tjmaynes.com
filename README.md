# tjmaynes.com

A static Astro site for TJ Maynes's business automation consulting and professional AI coaching. Cloudflare Pages project: `tjmaynes-site`.

## Local development

Use Node 24.20.0, pinned in `.node-version` and `.mise.toml`.

```sh
npm ci
npm run dev
```

`npm run check` builds `dist/` and runs the Node tests against the production output and booking and theme behavior. `npm run preview -- --host 100.93.107.73 --port 4321` serves that build over the existing Tailscale interface. Use your machine's actual Tailscale address if different.

The public website builds without access to the private career repository. Old CV-generation hooks and Zola tooling have been removed. Generated PDFs and private career source remain ignored and are not required by public CI.

## Content and shared configuration

- `src/pages/index.astro`: homepage and service choice.
- `src/pages/services/`: consulting, coaching, and the legacy tutoring redirect.
- `src/layouts/SiteLayout.astro`: shared metadata, navigation, theme, and footer.
- `src/config/services.mjs`: discovery event, paid coaching terms, and fixed UTM values.
- `src/components/`: shared booking callouts.
- `src/styles/site.css`: shared layout, theme, responsive rules, and component styles.

## Writing the site

Write as TJ speaking to a prospective client. Use first person for his work and “we” for work he does with the client. Describe the work, fees, and practical arrangements directly. Keep tool names in context, and avoid benefit slogans, feature catalogs, and repeated sales copy.

## Booking and measurement

All discovery CTAs link directly to `https://cal.com/tjmaynes/15min`, with only fixed service and placement UTM values. The event was verified as free and 15 minutes long, with Cal Video and available times. Its generic title and preparation questions still need account editing. No calendar booking has been created by the site tests.

Cal.com stores standard UTM values on completed bookings. Use its booking records for booked calls, then record attended qualified calls and paid engagements privately. Keep those measures separate from clicks. See [Cal.com UTM documentation](https://cal.com/help/bookings/utm-tracking).

Cloudflare Web Analytics can provide page visits when enabled in the existing project's Metrics tab. It does not support custom click events. See [Pages analytics setup](https://developers.cloudflare.com/pages/how-to/web-analytics/) and [Web Analytics limitations](https://developers.cloudflare.com/web-analytics/faq/).

Completed bookings are sourced from Cal.com, not inferred from CTA clicks.

## Deployment

TJ reviewed the local output and authorized publication on November 14, 2026.

The `Check website` workflow builds and tests pull requests and `main`. The separate `Deploy website to Cloudflare` workflow is manual and restricted to `main`. It reuses existing GitHub secrets `CLOUDFLARE_ACCOUNT_ID` and `CLOUDFLARE_API_TOKEN`, then deploys `dist/` to the existing `tjmaynes-site` project. It does not create a new Cloudflare project or change DNS.

To publish approved changes, push them to `main`, run checks, and run the deploy workflow. The Cloudflare preflight confirmed that automatic production and preview Git deployments are disabled. The manual GitHub deployment workflow owns publication and uploads the locally built `dist/`; do not enable a second deployment path.

After deployment, verify the domain, both service pages, 404 page, legacy redirect, and a real booking journey using an agreed test identity. Confirm the event title, video link, availability, confirmation, reminders, and cancellation/rescheduling behavior. Avoid creating a real appointment without an agreed test slot.

Browser rendering was not verified during preparation because local browser automation was unavailable. Review desktop and phone widths, keyboard focus, light and dark themes before publication.
