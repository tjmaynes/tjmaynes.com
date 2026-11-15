# tjmaynes.com

A static Astro site for TJ Maynes's business automation consulting and professional AI coaching. Cloudflare Pages project: `tjmaynes-site`.

## Local development

Use Node 24.20.0, pinned in `.node-version` and `.mise.toml`.

```sh
npm ci
npm run dev
```

`npm run check` builds `dist/` and runs the Node tests against the production output and booking, analytics, and theme behavior. `npm run preview -- --host 100.93.107.73 --port 4321` serves that build over the existing Tailscale interface. Use your machine's actual Tailscale address if different.

The public website builds without access to the private career repository. Old CV-generation hooks and Zola tooling have been removed. Generated PDFs and private career source remain ignored and are not required by public CI.

## Content and shared configuration

- `src/pages/index.astro`: homepage and service choice.
- `src/pages/services/`: consulting, coaching, and the legacy tutoring redirect.
- `src/layouts/SiteLayout.astro`: shared metadata, navigation, theme, and footer.
- `src/config/services.mjs`: discovery event, paid coaching terms, and fixed UTM values.
- `src/components/`: shared booking callouts and analytics setup.
- `src/styles/site.css`: shared layout, theme, responsive rules, and component styles.

## Writing the site

Write as TJ speaking to a prospective client. Use first person for his work and “we” for work he does with the client. Describe the work, fees, and practical arrangements directly. Keep tool names in context, and avoid benefit slogans, feature catalogs, and repeated sales copy.

## Booking and measurement

All discovery CTAs link directly to `https://cal.com/tjmaynes/15min`, with only fixed service and placement UTM values. The event was verified as free and 15 minutes long, with Cal Video and available times. Its generic title and preparation questions still need account editing. No calendar booking has been created by the site tests.

Cal.com stores standard UTM values on completed bookings. Use its booking records for booked calls, then record attended qualified calls and paid engagements privately. Keep those measures separate from clicks. See [Cal.com UTM documentation](https://cal.com/help/bookings/utm-tracking).

Cloudflare Web Analytics can provide page visits when enabled in the existing project's Metrics tab. It does not support custom click events. See [Pages analytics setup](https://developers.cloudflare.com/pages/how-to/web-analytics/) and [Web Analytics limitations](https://developers.cloudflare.com/web-analytics/faq/).

For a complete visit-to-click funnel, the optional Plausible adapter is ready but disabled. It requires an account and an account-specific script URL; no account, trial, or subscription has been created. To enable it after choosing that service:

1. Add `tjmaynes.com` to the account and copy its current `https://plausible.io/js/pa-....js` URL from Site installation.
2. Set repository Actions variable `PUBLIC_PLAUSIBLE_SCRIPT_URL` for the deploy workflow. For a local build, use the same variable in `.env`.
3. Add a custom event goal named exactly `Discovery call click`, with service and placement properties. See [Plausible custom event documentation](https://plausible.io/docs/custom-event-goals).
4. Deploy after review and verify pageviews and clicks in the actual dashboard. Tracking runs only on `tjmaynes.com` or `www.tjmaynes.com`, so local previews do not pollute it. Query strings and fragments are removed from measured URLs; event properties use a fixed vocabulary. Keep optional enhanced measurements off unless separately reviewed.

The adapter never waits for analytics or prevents navigation. Completed bookings are sourced from Cal.com, not inferred from CTA clicks. Cloudflare remains sufficient for a minimal page-visit baseline if a separate analytics subscription is not wanted; in that setup CTA click counts are unavailable.

## Deployment

TJ reviewed the local output and authorized publication on November 14, 2026.

The `Check website` workflow builds and tests pull requests and `main`. The separate `Deploy website to Cloudflare` workflow is manual and restricted to `main`. It reuses existing GitHub secrets `CLOUDFLARE_ACCOUNT_ID` and `CLOUDFLARE_API_TOKEN`, then deploys `dist/` to the existing `tjmaynes-site` project. It does not create a new Cloudflare project or change DNS.

To publish approved changes, push them to `main`, run checks, and run the deploy workflow. If Cloudflare's Git integration independently deploys `main`, confirm its build command (`npm run build`) and output (`dist`) and choose one deployment owner before pushing. Do not enable duplicate deployment paths.

After deployment, verify the domain, both service pages, 404 page, legacy redirect, and a real booking journey using an agreed test identity. Confirm the event title, video link, availability, confirmation, reminders, and cancellation/rescheduling behavior. Avoid creating a real appointment without an agreed test slot.

Browser rendering was not verified during preparation because local browser automation was unavailable. Review desktop and phone widths, keyboard focus, light and dark themes before publication.
