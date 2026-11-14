export const sampleRows = Object.freeze([
  Object.freeze({ category: 'Subscriptions', currentCents: 100000, previousCents: 90000 }),
  Object.freeze({ category: 'Services', currentCents: 45000, previousCents: 40000 }),
  Object.freeze({ category: 'Training', currentCents: 12500, previousCents: 10000 }),
]);

export const formatMoney = cents => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(cents / 100);

export function buildReport(rows) {
  if (!Array.isArray(rows) || rows.length === 0) return { ok: false, error: 'Add at least one row before preparing the report.' };
  const seen = new Set();
  let totalCents = 0;
  let previousCents = 0;
  for (const row of rows) {
    if (!row || typeof row.category !== 'string' || !row.category.trim()) return { ok: false, error: 'Every row needs a category.' };
    const category = row.category.trim().toLowerCase();
    if (seen.has(category)) return { ok: false, error: `Duplicate category: ${row.category}. Check the source data.` };
    seen.add(category);
    for (const field of ['currentCents', 'previousCents']) {
      if (!Number.isSafeInteger(row[field]) || row[field] < 0) return { ok: false, error: `${row.category} has a missing or invalid figure. Correct the source before preparing a draft.` };
    }
    totalCents += row.currentCents;
    previousCents += row.previousCents;
    if (!Number.isSafeInteger(totalCents) || !Number.isSafeInteger(previousCents)) return { ok: false, error: 'The total is too large to calculate reliably.' };
  }
  const changePercent = previousCents === 0 ? null : ((totalCents - previousCents) / previousCents) * 100;
  const comparison = changePercent === null
    ? 'A percentage comparison is unavailable because the previous total was zero.'
    : changePercent === 0 ? 'Revenue is unchanged from the previous period.'
      : `Revenue is ${new Intl.NumberFormat('en-US', { maximumFractionDigits: 1 }).format(Math.abs(changePercent))}% ${changePercent > 0 ? 'higher' : 'lower'} than the previous period.`;
  return { ok: true, totalCents, previousCents, changePercent, draft: `This period’s revenue is ${formatMoney(totalCents)} across ${rows.length} categories. ${comparison} Check the figures and add business context before sharing.` };
}
