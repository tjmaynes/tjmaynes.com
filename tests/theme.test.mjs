import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { test } from 'node:test';
import { runInNewContext } from 'node:vm';

const source = await readFile(new URL('../src/layouts/SiteLayout.astro', import.meta.url), 'utf8');

function loadTheme({ dark = false, saved = null, blocked = false } = {}) {
  const script = source.match(/<script is:inline id="theme-script">([\s\S]*?)<\/script>/)?.[1];
  assert.ok(script, 'Page initializes theme before rendering');
  const listeners = {};
  const button = { textContent: '', hidden: true, setAttribute(name, value) { this[name] = value; }, addEventListener(name, handler) { listeners[name] = handler; } };
  const root = { dataset: {} };
  const meta = { setAttribute(name, value) { this[name] = value; } };
  const media = { matches: dark, addEventListener(name, handler) { listeners.system = handler; } };
  runInNewContext(script, {
    document: { documentElement: root, querySelector: () => meta, getElementById: () => button, addEventListener(name, handler) { listeners[name] = handler; } },
    window: { matchMedia: () => media },
    localStorage: { getItem() { if (blocked) throw new Error('Blocked'); return saved; }, setItem(key, value) { if (blocked) throw new Error('Blocked'); saved = value; } },
  });
  const initialTheme = root.dataset.theme;
  listeners.DOMContentLoaded();
  return { root, meta, button, initialTheme, click: () => listeners.click(), changeSystem(value) { media.matches = value; listeners.system(); }, saved: () => saved };
}

test('defaults to the system theme before rendering with a sun or moon button', () => {
  for (const [dark, theme, icon] of [[true, 'dark', '🌙'], [false, 'light', '☀️']]) {
    const page = loadTheme({ dark });
    assert.equal(page.initialTheme, theme);
    assert.equal(page.button.textContent, icon);
    assert.equal(page.button.hidden, false);
  }
});

test('toggles only between light and dark and keeps manual choice during system changes', () => {
  const page = loadTheme({ dark: true });
  page.click();
  assert.equal(page.root.dataset.theme, 'light');
  assert.equal(page.button.textContent, '☀️');
  assert.equal(page.button['aria-label'], 'Current theme: light. Switch to dark theme');
  page.changeSystem(true);
  assert.equal(page.root.dataset.theme, 'light');
  page.click();
  assert.equal(page.root.dataset.theme, 'dark');
  assert.equal(page.button.textContent, '🌙');
  page.click();
  assert.equal(page.root.dataset.theme, 'light');
});

test('starts from system on every load regardless of previously saved preferences', () => {
  assert.equal(loadTheme({ saved: 'dark' }).initialTheme, 'light');
  assert.equal(loadTheme({ saved: 'light', dark: true }).initialTheme, 'dark');
  const page = loadTheme({ blocked: true });
  page.click();
  assert.equal(page.root.dataset.theme, 'dark');
  assert.equal(loadTheme().initialTheme, 'light');
});

test('follows system changes until manually toggled', () => {
  const page = loadTheme({ dark: true });
  page.changeSystem(false);
  assert.equal(page.root.dataset.theme, 'light');
  assert.equal(page.meta.content, '#f4f2eb');
  assert.equal(page.button.textContent, '☀️');
});
