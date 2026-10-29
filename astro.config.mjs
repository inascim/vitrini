// @ts-check
import { defineConfig } from 'astro/config';
import { readFileSync, writeFileSync } from 'node:fs';
import { parse } from 'yaml';

// Owners never edit this file. Everything comes from site.config.yaml or,
// on GitHub Actions, from the environment set by .github/workflows/deploy.yml.
const siteConfig = parse(readFileSync('./site.config.yaml', 'utf8')) ?? {};
const domain = typeof siteConfig.domain === 'string' ? siteConfig.domain.trim() : '';

const site = domain ? `https://${domain}` : process.env.SITE_ORIGIN || undefined;
const base = domain ? '/' : process.env.BASE_PATH || '/';

/**
 * Writes a CNAME file when a custom domain is configured.
 * @type {import('astro').AstroIntegration}
 */
const cname = {
  name: 'vitrine-cname',
  hooks: {
    'astro:build:done': ({ dir }) => {
      if (domain) writeFileSync(new URL('CNAME', dir), domain + '\n');
    },
  },
};

export default defineConfig({
  site,
  base,
  integrations: [cname],
});
