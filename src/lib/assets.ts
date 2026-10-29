import type { ImageMetadata } from 'astro';

// Images and videos referenced by path from site.config.yaml or case.yaml are
// resolved here so Astro can optimize and fingerprint them.
const images = import.meta.glob<ImageMetadata>('/content/**/*.{jpg,jpeg,png,webp,avif,gif,svg}', {
  eager: true,
  import: 'default',
});
const videos = import.meta.glob<string>('/content/**/*.{mp4,webm,mov}', {
  eager: true,
  query: '?url',
  import: 'default',
});

function normalize(path: string) {
  const parts: string[] = [];
  for (const part of path.split('/')) {
    if (part === '..') parts.pop();
    else if (part && part !== '.') parts.push(part);
  }
  return '/' + parts.join('/');
}

/** Resolves a repo-relative image path such as "content/assets/avatar.jpg". */
export function resolveImage(path: string): ImageMetadata {
  const image = images[normalize(path)];
  if (!image) throw new Error(`Image not found: "${path}". Paths are relative to the repository root, e.g. "content/assets/avatar.jpg".`);
  return image;
}

/** Resolves a video path relative to the case.yaml that references it. */
export function resolveVideo(path: string, fromFile: string): string {
  const dir = fromFile.split('/').slice(0, -1).join('/');
  const key = normalize(path.startsWith('content/') ? path : `${dir}/${path}`);
  const url = videos[key];
  if (!url) throw new Error(`Video not found: "${path}" (referenced from ${fromFile}).`);
  return url;
}
