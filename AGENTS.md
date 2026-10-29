# Working on a Vitrine site

This repo is a multilingual portfolio site built with Astro and published to GitHub Pages. The person it is about (the **Owner**) usually asks for content changes: add a case, translate a page, update a bio, change colors. Read `GLOSSARY.md` for the terms used here.

## The rule

**Content changes only touch `site.config.yaml` and files under `content/`.** Do not edit `src/` to change text, images, colors, or which sections appear. Every one of those is a setting or a content file. Only touch `src/` when the Owner explicitly asks for a new feature or a layout change.

## Where things live

| What | File |
| --- | --- |
| Name, photo, languages, sections on/off, theme, contact links, client logos, analytics | `site.config.yaml` |
| Hero text, page title/description, section titles, services, testimonials, UI label overrides — per language | `content/locales/<locale>.yaml` |
| About text — per language | `content/about/<locale>.md` |
| A Case: shared data (cover, date, client, gallery) | `content/cases/<slug>/case.yaml` |
| A Case: text — per language | `content/cases/<slug>/<locale>.md` |
| Images used by the config (photo, logos) | `content/assets/` |
| Images used by a Case | inside that Case's folder |

Locale codes are the ones listed in `locales:` in `site.config.yaml` (e.g. `pt`, `en`, `es`).

## Tasks

### Add a Case

1. Create `content/cases/<slug>/` — slug is lowercase-with-hyphens; it becomes the URL.
2. Add the cover image there (JPG/PNG/WebP; any size — it is optimized at build time).
3. Create `case.yaml` by copying an existing one. `cover` and `date` are required.
4. Create `<locale>.md` for each language, copying the frontmatter shape from an existing case. `title` and `summary` are required. The body is Markdown: use `## The challenge`, `## The strategy`, `## Results` style headings.
5. A file for the `defaultLocale` is required. Other languages may be added later; until then the default-language text is shown with a "not translated yet" notice.

When the Owner gives you a document (brief, report, deck text) to turn into a Case, extract: title, one-sentence summary, client, their role, 2–4 quantified results for `metrics` (`value` is the number as displayed, e.g. "+38%"; `label` is a short description), and tags. Write the body as a short story — challenge, strategy, results — not a copy of the document.

### Translate

Create the missing `<locale>.md` / `<locale>.yaml` next to the existing one with the same structure, translating every text value. Keep `metrics.value` numbers identical but use the target language's number format ("6,2x" in Portuguese/Spanish, "6.2x" in English). Do not translate brand or client names.

### Add a language

1. Add the code to `locales:` in `site.config.yaml`.
2. Create `content/locales/<code>.yaml` (copy and translate an existing one).
3. Create `content/about/<code>.md` and the Case `<code>.md` files (optional — missing ones fall back).
4. Built-in interface labels exist for `pt`, `en`, `es`. For any other language, also translate the labels under `ui:` in the new locale file — the full list of keys is the `en` dictionary in `src/lib/i18n.ts`. Untranslated labels fall back to English.

### Change the look

Edit `theme:` in `site.config.yaml`: `preset` (`editorial`, `modern`, `bold`, `classic`), `accent` (hex color), `mode` (`light`, `dark`, `system`), and optional `fonts` (any Google Fonts family names).

### Hide a section

Set it to `false` under `sections:` in `site.config.yaml`. The hero always shows.

### Gallery media in a Case

In `case.yaml` under `media:` — see the commented examples in `content/cases/serra-coffee-launch/case.yaml`. Types: `image`, `video` (an .mp4 in the Case folder), `youtube` / `vimeo` (video ID), `link` (Instagram/TikTok or any post: shown as a thumbnail card linking out).

### Highlight words

In headlines and section titles, wrap words in `*asterisks*` to show them in the accent color and italic.

### Remove the example content

The repo ships with a fictional Owner, "Ana Exemplo". To start fresh:
1. Delete every folder under `content/cases/` except one, and rewrite that one as the Owner's first Case.
2. Replace `content/assets/avatar.jpg` and the logos in `content/assets/logos/`; update `clients:`.
3. Rewrite `content/locales/*.yaml` and `content/about/*.md`.
4. Update `name`, `location`, `contact` in `site.config.yaml`.

## Verify

Run `npm run check` (Node 22+; `.nvmrc` pins the version). It type-checks and builds; content errors name the file and field. Always run it after changes and fix what it reports. `npm run dev` serves the site at http://localhost:4321.

## Schema

Every content file is validated, and unknown fields are rejected — a typo such as `summry:` fails the build. The schemas are in `src/content.config.ts` (content files) and `src/lib/config.ts` (`site.config.yaml`); read them when unsure which fields exist.
