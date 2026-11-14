export const discovery = Object.freeze({
  url: 'https://cal.com/tjmaynes/15min',
  label: 'Book a discovery call',
  duration: 15,
});
export const coaching = Object.freeze({ price: 150, currency: 'USD', minutes: 60 });

export function bookingUrl(service = 'home', placement = 'contact') {
  const url = new URL(discovery.url);
  url.search = new URLSearchParams({
    utm_source: 'tjmaynes.com',
    utm_medium: 'website',
    utm_campaign: ['home', 'consulting', 'coaching'].includes(service) ? service : 'home',
    utm_content: ['header', 'hero', 'contact'].includes(placement) ? placement : 'contact',
  }).toString();
  return url.href;
}
