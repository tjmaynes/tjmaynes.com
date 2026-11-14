import assert from 'node:assert/strict';
import { test } from 'node:test';
import { discoveryClick, analyticsScriptUrl } from '../src/lib/analytics.mjs';

test('the booking event contains only whitelisted service and placement values', () => {
  assert.deepEqual(discoveryClick({bookingService:'coaching',bookingPlacement:'hero'}), {name:'Discovery call click',props:{service:'coaching',placement:'hero'}});
  assert.equal(discoveryClick({bookingService:'private@email.test',bookingPlacement:'hero'}),null);
  assert.equal(discoveryClick({bookingService:'coaching',bookingPlacement:'a task description'}),null);
});
test('analytics is disabled without a valid official account script URL', () => {
  for (const input of ['',undefined,'javascript:alert(1)','https://other.test/script.js','https://plausible.io@other.test/js/pa-example.js']) assert.equal(analyticsScriptUrl(input),null);
  assert.equal(analyticsScriptUrl('https://plausible.io/js/pa-example.js'),'https://plausible.io/js/pa-example.js');
});

test('analytics removes query strings and fragments from page and referrer URLs', async () => {
  const { sanitizePayload } = await import('../src/lib/analytics.mjs');
  const result = sanitizePayload({n:'pageview',u:'https://tjmaynes.com/services/coaching/?email=private@example.test#private',r:'https://example.test/?secret=value',p:{}});
  assert.equal(result.u,'https://tjmaynes.com/services/coaching/');
  assert.equal(result.r,'https://example.test/');
});
