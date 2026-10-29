import { z } from 'astro/zod';
import { parse } from 'yaml';
import raw from '../../site.config.yaml?raw';
import { presetNames } from './themes';

const localeCode = z.string().regex(/^[a-z]{2,3}(-[A-Za-z]{2,4})?$/, 'Use a language code like "pt", "en" or "pt-BR"');
const hexColor = z.string().regex(/^#[0-9a-fA-F]{6}$/, 'Use a 6-digit hex color like "#e4572e"');

const schema = z
  .strictObject({
    name: z.string(),
    avatar: z.string().optional(),
    location: z.string().optional(),
    domain: z.string().default(''),
    locales: z.array(localeCode).min(1),
    defaultLocale: localeCode,
    sections: z
      .strictObject({
        cases: z.boolean().default(true),
        about: z.boolean().default(true),
        services: z.boolean().default(true),
        clients: z.boolean().default(true),
        testimonials: z.boolean().default(true),
        contact: z.boolean().default(true),
      })
      .default({ cases: true, about: true, services: true, clients: true, testimonials: true, contact: true }),
    theme: z
      .strictObject({
        preset: z.enum(presetNames).default('editorial'),
        accent: z.union([hexColor, z.literal('')]).default(''),
        mode: z.enum(['light', 'dark', 'system']).default('light'),
        fonts: z
          .strictObject({
            heading: z.string().optional(),
            body: z.string().optional(),
          })
          .default({}),
      })
      .default({ preset: 'editorial', accent: '', mode: 'light', fonts: {} }),
    contact: z
      .strictObject({
        email: z.email().optional(),
        whatsapp: z.string().optional(),
        links: z.array(z.strictObject({ label: z.string(), url: z.url() })).default([]),
      })
      .default({ links: [] }),
    clients: z
      .array(
        z.strictObject({
          name: z.string(),
          logo: z.string().optional(),
          url: z.url().optional(),
        }),
      )
      .default([]),
    analytics: z
      .strictObject({
        ga4: z.string().default(''),
        metaPixel: z.string().default(''),
      })
      .default({ ga4: '', metaPixel: '' }),
    cases: z
      .strictObject({
        filterThreshold: z.number().int().min(0).default(6),
      })
      .default({ filterThreshold: 6 }),
  })
  .refine((c) => c.locales.includes(c.defaultLocale), {
    message: 'defaultLocale must be one of the locales listed in "locales"',
    path: ['defaultLocale'],
  });

function load() {
  const result = schema.safeParse(parse(raw) ?? {});
  if (!result.success) {
    throw new Error(`site.config.yaml is invalid:\n${z.prettifyError(result.error)}`);
  }
  return result.data;
}

export const config = load();
export type SiteConfig = typeof config;
export type Locale = string;
