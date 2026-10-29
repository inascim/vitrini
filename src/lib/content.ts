import { getCollection, getEntry, type CollectionEntry } from 'astro:content';
import { config } from './config';
import { translator } from './i18n';

/**
 * Content lookups with Default Locale fallback: when a Locale lacks a file,
 * the Default Locale's version is returned with `translated: false`.
 */

export interface Localized<T> {
  entry: T;
  /** The Locale the content is actually written in. */
  locale: string;
  translated: boolean;
}

function localized<T>(locale: string, own: T | undefined, fallback: T | undefined, what: string): Localized<T> {
  if (own) return { entry: own, locale, translated: true };
  if (fallback) return { entry: fallback, locale: config.defaultLocale, translated: false };
  throw new Error(`Missing ${what} for the default locale "${config.defaultLocale}".`);
}

export async function getLocaleContent(locale: string) {
  const own = await getEntry('locales', locale);
  const fallback = await getEntry('locales', config.defaultLocale);
  const content = localized(locale, own, fallback, `content/locales/${config.defaultLocale}.yaml`);
  return { ...content, t: translator(locale, content.entry.data.ui) };
}

export async function getAbout(locale: string) {
  const own = await getEntry('about', locale);
  const fallback = await getEntry('about', config.defaultLocale);
  return localized(locale, own, fallback, `content/about/${config.defaultLocale}.md`);
}

export interface Case {
  slug: string;
  meta: CollectionEntry<'cases'>;
  text: Localized<CollectionEntry<'caseTexts'>>;
}

export async function getCases(locale: string): Promise<Case[]> {
  const metas = await getCollection('cases', (c) => !c.data.draft);
  const texts = new Map((await getCollection('caseTexts')).map((t) => [t.id, t]));

  const cases = metas.map((meta) => ({
    slug: meta.id,
    meta,
    text: localized(
      locale,
      texts.get(`${meta.id}/${locale}`),
      texts.get(`${meta.id}/${config.defaultLocale}`),
      `content/cases/${meta.id}/${config.defaultLocale}.md`,
    ),
  }));

  // Explicit `order` first (ascending), then newest first.
  return cases.sort((a, b) => {
    const ao = a.meta.data.order ?? Infinity;
    const bo = b.meta.data.order ?? Infinity;
    if (ao !== bo) return ao - bo;
    return b.meta.data.date.getTime() - a.meta.data.date.getTime();
  });
}

/** Unique Tags across Cases, in first-seen order. */
export function collectTags(cases: Case[]) {
  return [...new Set(cases.flatMap((c) => c.text.entry.data.tags))];
}
