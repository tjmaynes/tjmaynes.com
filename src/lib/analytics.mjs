export function discoveryClick(dataset) {
  const { bookingService: service, bookingPlacement: placement } = dataset;
  if (!['home', 'consulting', 'coaching'].includes(service) || !['header', 'hero', 'contact'].includes(placement)) return null;
  return { name: 'Discovery call click', props: { service, placement } };
}

export function analyticsScriptUrl(value) {
  if (typeof value !== 'string') return null;
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && url.hostname === 'plausible.io' && !url.username && !url.password && !url.search && !url.hash && /^\/js\/pa-[a-zA-Z0-9_-]+\.js$/.test(url.pathname) ? url.href : null;
  } catch { return null; }
}

export function sanitizePayload(payload) {
  const sanitized = { ...payload };
  for (const key of ['u', 'r']) {
    if (sanitized[key]) {
      try { const url = new URL(sanitized[key]); sanitized[key] = url.origin + url.pathname; }
      catch { sanitized[key] = ''; }
    }
  }
  return sanitized;
}
