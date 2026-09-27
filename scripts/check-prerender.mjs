import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';
const { routes } = JSON.parse(readFileSync('.next/prerender-manifest.json', 'utf8'));
for (const locale of ['en', 'bg']) {
  for (const suffix of ['', '/about', '/blog', '/contact', '/process', '/services', '/work', '/privacy', '/terms']) {
    const path = `/${locale}${suffix}`;
    assert.ok(routes[path], `${path} must be prerendered, not only marked SSG in the build summary`);
    assert.equal(routes[path].initialRevalidateSeconds, false, `${path} unexpectedly needs regeneration`);
  }
}
console.log('Verified public marketing and legal routes are prerendered in both locales');
