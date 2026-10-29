import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Schemas use strictObject so a misspelled field fails the build with a clear
// message instead of being silently ignored.

const withoutExtension = ({ entry }: { entry: string }) => entry.replace(/\.(md|ya?ml)$/, '');

const metric = z.strictObject({
  value: z.string(),
  label: z.string(),
});

const link = z.strictObject({
  label: z.string(),
  url: z.url(),
});

/** content/cases/<slug>/case.yaml — data shared by every Locale. */
const cases = defineCollection({
  loader: glob({
    pattern: '*/case.yaml',
    base: './content/cases',
    generateId: ({ entry }) => entry.split('/')[0],
  }),
  schema: ({ image }) =>
    z.strictObject({
      cover: image(),
      date: z.coerce.date(),
      client: z.string().optional(),
      order: z.number().optional(),
      draft: z.boolean().default(false),
      media: z
        .array(
          z.discriminatedUnion('type', [
            z.strictObject({ type: z.literal('image'), src: image(), alt: z.string().default('') }),
            z.strictObject({ type: z.literal('video'), src: z.string(), poster: image().optional() }),
            z.strictObject({ type: z.literal('youtube'), id: z.string() }),
            z.strictObject({ type: z.literal('vimeo'), id: z.string() }),
            z.strictObject({
              type: z.literal('link'),
              url: z.url(),
              platform: z.string().optional(),
              thumbnail: image().optional(),
            }),
          ]),
        )
        .default([]),
    }),
});

/** content/cases/<slug>/<locale>.md — the translatable text of a Case. */
const caseTexts = defineCollection({
  loader: glob({ pattern: '*/*.md', base: './content/cases', generateId: withoutExtension }),
  schema: z.strictObject({
    title: z.string(),
    summary: z.string(),
    tags: z.array(z.string()).default([]),
    role: z.string().optional(),
    coverAlt: z.string().optional(),
    metrics: z.array(metric).default([]),
    links: z.array(link).default([]),
  }),
});

/** content/about/<locale>.md — the About Section body. */
const about = defineCollection({
  loader: glob({ pattern: '*.md', base: './content/about', generateId: withoutExtension }),
  schema: z.strictObject({}),
});

const sectionText = z.strictObject({
  title: z.string().optional(),
  intro: z.string().optional(),
});

/** content/locales/<locale>.yaml — every other translatable text. */
const locales = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './content/locales', generateId: withoutExtension }),
  schema: z.strictObject({
    meta: z.strictObject({
      title: z.string(),
      description: z.string(),
    }),
    hero: z.strictObject({
      role: z.string(),
      headline: z.string(),
      intro: z.string().optional(),
      availability: z.string().optional(),
    }),
    sections: z
      .strictObject({
        cases: sectionText.optional(),
        about: sectionText.optional(),
        services: sectionText.optional(),
        clients: sectionText.optional(),
        testimonials: sectionText.optional(),
        contact: sectionText.optional(),
      })
      .default({}),
    services: z.array(z.strictObject({ title: z.string(), description: z.string() })).default([]),
    testimonials: z
      .array(
        z.strictObject({
          quote: z.string(),
          name: z.string(),
          role: z.string().optional(),
        }),
      )
      .default([]),
    ui: z.record(z.string(), z.string()).default({}),
  }),
});

export const collections = { cases, caseTexts, about, locales };
