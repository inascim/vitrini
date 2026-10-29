# Astro build with one content file per Locale

Vitrine is a static site built by Astro in a GitHub Action, with each Case and page stored as one Markdown/YAML file per Locale (`content/cases/<slug>/pt.md`, `en.md`, …) plus a language-neutral `case.yaml`. We chose this over a no-build site that renders a single JSON file in the browser, even though that would be simpler to deploy on GitHub Pages.

The deciding factors: Owners in marketing need each language indexed separately by search engines and need shareable per-Case links with previews, which requires pre-rendered pages; Owners often hand documents to an AI agent, and a schema-validated build turns that agent's mistakes into a failed check instead of a broken live site. Per-Locale files keep each translation readable as a standalone document and let a new Locale be added without touching existing files.

Consequence: a Fork must enable "GitHub Actions" as its Pages source once, and local preview needs Node.
