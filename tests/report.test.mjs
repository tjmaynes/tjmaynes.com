import assert from 'node:assert/strict';
import { test } from 'node:test';
import { buildReport, sampleRows } from '../src/lib/report.mjs';

test('validated sample data produces exact totals and a draft for human review', () => {
  const report = buildReport(sampleRows);
  assert.equal(report.ok, true);
  assert.equal(report.totalCents, 157500);
  assert.equal(report.previousCents, 140000);
  assert.equal(report.changePercent, 12.5);
  assert.match(report.draft, /\$1,575\.00/);
  assert.match(report.draft, /12\.5%/);
});

test('an incomplete report is blocked rather than silently understating the total', () => {
  const rows = sampleRows.map(row => ({...row}));
  rows[1].currentCents = null;
  const result = buildReport(rows);
  assert.equal(result.ok, false);
  assert.equal(result.draft, undefined);
  assert.match(result.error, /Services/);
});

test('empty, malformed, duplicate, negative, fractional and unsafe amounts cannot produce a report', () => {
  const invalid = [null, [], [{}], [sampleRows[0], sampleRows[0]], ...[undefined, '', '123', NaN, Infinity, -1, 1.2, Number.MAX_SAFE_INTEGER + 1].map(value => [{...sampleRows[0], currentCents:value}]), [{...sampleRows[0],previousCents:null}]];
  for (const rows of invalid) {
    const result = buildReport(rows);
    assert.equal(result.ok, false, JSON.stringify(rows));
    assert.equal(result.draft, undefined);
  }
});

test('zero previous revenue avoids a misleading percentage and total overflow is rejected', () => {
  const zero = buildReport([{category:'Example',currentCents:0,previousCents:0}]);
  assert.equal(zero.ok, true);
  assert.equal(zero.changePercent, null);
  assert.doesNotMatch(zero.draft, /NaN|Infinity/);
  assert.equal(buildReport([{category:'One',currentCents:Number.MAX_SAFE_INTEGER,previousCents:0},{category:'Two',currentCents:1,previousCents:0}]).ok,false);
});
