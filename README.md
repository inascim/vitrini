# Vitrine

A multilingual portfolio template for GitHub Pages — for marketers, designers, writers, developers, anyone with work to show. You change text and images in plain files; you never have to touch code.

- **Multilingual** — Portuguese, English and Spanish built in, add any other language. Each language gets its own pages (`/pt/`, `/en/`, `/es/`) and visitors land on theirs automatically.
- **Case studies** — a project grid with a page per case: results, gallery, videos, links to posts.
- **Sections** — hero, cases, about, services, client logos, testimonials, contact. Turn any off.
- **Themes** — four presets, your own accent color and Google Fonts, light/dark.
- **Safe to edit** — every change is checked before going live. A typo shows a red ✗ on GitHub instead of breaking your site.
- **Agent-friendly** — `AGENTS.md` tells an AI assistant exactly where everything lives.

## Get your own site (5 minutes)

1. Click **Use this template → Create a new repository** (or fork it).
   - Name it `yourusername.github.io` for a site at `https://yourusername.github.io`, or anything else (e.g. `portfolio`) for `https://yourusername.github.io/portfolio`.
2. In the new repo, open **Settings → Pages** and set **Source** to **GitHub Actions**.
3. Open the **Actions** tab and re-run the workflow (or push any change). Your site is live when it turns green.

## Make it yours

Everything you edit is in two places:

| File | What's in it |
| --- | --- |
| `site.config.yaml` | Name, photo, languages, theme, contact, client logos, which sections show |
| `content/` | All text (one file per language) and images |

```
content/
├── locales/pt.yaml          ← hero, services, testimonials (one file per language)
├── about/pt.md              ← About text
├── assets/                  ← your photo and client logos
└── cases/
    └── my-campaign/
        ├── case.yaml        ← cover image, date, client, gallery
        ├── cover.jpg
        ├── pt.md            ← title, summary, results and story in Portuguese
        ├── en.md
        └── es.md
```

You can edit files directly on github.com (open a file → pencil icon → **Commit changes**) — the site rebuilds by itself.

The repo starts with a fictional person, "Ana Exemplo", so you can see every feature. Replace her content step by step; see **Remove the example content** in [`AGENTS.md`](AGENTS.md).

### Common changes

- **Add a case:** copy a folder in `content/cases/`, rename it (the name becomes the URL), replace the images and text.
- **Missing a translation?** Just leave the file out. Visitors see your default language with a small note.
- **Add a language:** add its code to `locales:` in `site.config.yaml` and create `content/locales/<code>.yaml`.
- **Highlight a word:** in headlines, write `*word*` to show it in your accent color.
- **Custom domain:** set `domain:` in `site.config.yaml`, then add the same domain in **Settings → Pages → Custom domain**.
- **Analytics:** put your GA4 or Meta Pixel ID under `analytics:`. A cookie consent banner appears automatically.

### Using an AI assistant

Open the repo in Claude Code, Cursor, Copilot or similar and ask in plain words — *"Turn this campaign report into a new case in Portuguese, English and Spanish"*. `AGENTS.md` tells the assistant where things go and how to check its work.

## Run it locally (optional)

Requires Node 22+.

```sh
npm install
npm run dev     # http://localhost:4321
npm run check   # validate content and build, as GitHub does
```

## License

MIT. See [LICENSE](LICENSE).
