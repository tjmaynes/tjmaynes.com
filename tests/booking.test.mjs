import assert from 'node:assert/strict';
import { test } from 'node:test';
import { bookingUrl } from '../src/config/services.mjs';

test('booking URLs use only fixed attribution values', () => {
  const url = new URL(bookingUrl('coaching', 'hero'));
  assert.equal(url.origin + url.pathname, 'https://cal.com/tjmaynes/15min');
  assert.deepEqual(Object.fromEntries(url.searchParams), {utm_source:'tjmaynes.com',utm_medium:'website',utm_campaign:'coaching',utm_content:'hero'});
});
test('arbitrary service and placement values cannot leak personal data into attribution', () => {
  const url = new URL(bookingUrl('private@email.test', 'a private workflow'));
  assert.equal(url.searchParams.get('utm_campaign'), 'home');
  assert.equal(url.searchParams.get('utm_content'), 'contact');
  assert.ok(!url.href.includes('private'));
});
