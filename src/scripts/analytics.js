import { discoveryClick, analyticsScriptUrl, sanitizePayload } from '../lib/analytics.mjs';

export function initializeAnalytics() {
  const src = analyticsScriptUrl(document.querySelector('meta[name="analytics-script"]')?.content);
  if (!src || !['tjmaynes.com', 'www.tjmaynes.com'].includes(window.location.hostname)) return;
  const plausible = window.plausible || function (...args) { (plausible.q = plausible.q || []).push(args); };
  window.plausible = plausible;
  plausible.init = plausible.init || function (options) { plausible.o = options; };
  plausible.init({ transformRequest: sanitizePayload });
  const script = document.createElement('script');
  script.src = src;
  script.async = true;
  document.head.append(script);
  document.addEventListener('click', event => {
    const link = event.target instanceof Element ? event.target.closest('[data-booking-service]') : null;
    if (!link) return;
    const metric = discoveryClick(link.dataset);
    if (!metric) return;
    try { window.plausible(metric.name, { props: metric.props }); }
    catch { /* Measurement must never interrupt booking. */ }
  });
}
