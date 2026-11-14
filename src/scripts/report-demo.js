import { buildReport, sampleRows, formatMoney } from '../lib/report.mjs';

export function mountReportDemo(root) {
  const controls = root.querySelector('[data-demo-controls]');
  const missing = root.querySelector('[data-missing]');
  const run = root.querySelector('[data-run]');
  const cell = root.querySelector('[data-category="Services"]');
  const status = root.querySelector('[data-status]');
  const draft = root.querySelector('[data-draft]');
  controls.hidden = false;
  missing.addEventListener('change', () => {
    cell.textContent = missing.checked ? 'Missing' : formatMoney(sampleRows[1].currentCents);
    cell.classList.toggle('invalid-figure', missing.checked);
    status.textContent = 'Inputs changed. Run the checks again.';
    status.dataset.state = 'pending';
    draft.textContent = 'The previous draft is cleared until the figures pass validation.';
  });
  run.addEventListener('click', () => {
    const rows = sampleRows.map(row => ({ ...row, currentCents: row.category === 'Services' && missing.checked ? null : row.currentCents }));
    const report = buildReport(rows);
    status.dataset.state = report.ok ? 'valid' : 'invalid';
    status.textContent = report.ok ? 'Checks passed. Human review needed.' : 'Stopped: a figure needs attention.';
    draft.textContent = report.ok ? report.draft : report.error;
  });
}
