import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import { test } from 'node:test';

const output = new URL('../dist/', import.meta.url);
const routes = ['/', '/services/consulting/', '/services/coaching/'];
const pages = new Map(await Promise.all(routes.map(async route => [route, await readFile(new URL(`${route.slice(1)}index.html`, output), 'utf8')])));

test('all public navigation and fragments resolve from every service page', async () => {
  for (const [route, page] of pages) {
    for (const [, href] of page.matchAll(/<a\b[^>]*href="((?:\/|#)[^"]*)"/g)) {
      const target = new URL(href, `https://tjmaynes.com${route}`);
      const file = target.pathname.includes('.') ? target.pathname.slice(1) : `${target.pathname.replace(/^\/|\/$/g, '')}/index.html`.replace(/^\//, '');
      const content = await readFile(new URL(file, output), 'utf8');
      if (target.hash) assert.ok(content.includes(`id="${target.hash.slice(1)}"`), `${route}: missing ${href}`);
    }
  }
});

test('booking actions go directly to the 15-minute event with service attribution', () => {
  for (const [route, page] of pages) {
    const links = [...page.matchAll(/<a\b[^>]*href="(https:\/\/cal\.com\/[^"]+)"[^>]*>/g)];
    assert.ok(links.length >= 3, `${route}: booking in header, introduction and final callout`);
    for (const [, href] of links) {
      const target = new URL(href.replaceAll('&amp;', '&'));
      assert.equal(target.pathname, '/tjmaynes/15min');
      assert.equal(target.searchParams.get('utm_source'), 'tjmaynes.com');
      assert.equal(target.searchParams.get('utm_campaign'), route.includes('coaching') ? 'coaching' : route.includes('consulting') ? 'consulting' : 'home');
      assert.match(target.searchParams.get('utm_content'), /^(header|hero|contact)$/);
    }
    assert.match(page, /mailto:tj@tjmaynes.com/);
    assert.doesNotMatch(page, /forms\.gle|docs\.google\.com\/forms/);
  }
});

test('the homepage offers both services and keeps credentials out of the primary navigation', () => {
  const html = pages.get('/');
  assert.match(html, /href="\/services\/consulting\/"/);
  assert.match(html, /href="\/services\/coaching\/"/);
  const nav = html.match(/<nav\b[\s\S]*?<\/nav>/)[0];
  assert.doesNotMatch(nav, /linkedin|cv\.pdf/i);
  assert.match(html, /https:\/\/linkedin.com\/in\/tjmaynes/);
});

test('the retired tutoring route points to coaching', async () => {
  const page = await readFile(new URL('services/tutoring/index.html', output), 'utf8');
  assert.match(page, /\/services\/coaching\//);
});

test('published output excludes private career source and intermediates', async () => {
  const files = await readdir(output, { recursive: true });
  assert.ok(!files.some(file => /\.(yaml|yml|py|typ|lock|toml)$/.test(file)), 'Private source or build intermediates in dist');
  for (const page of pages.values()) {
    assert.doesNotMatch(page, /sproutup|Rochester|Minnesota|Software engineer and engineering manager|—/i);
  }
});

test('the review artifact excludes unused local CV inputs just like clean CI', async () => {
  const files = await readdir(output, {recursive:true});
  assert.ok(!files.some(file => /^career(?:[\\/]|$)/.test(file)), 'Unused local CV must not enter the deployment artifact');
});
