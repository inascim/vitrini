/**
 * Theme presets. An Owner picks one in site.config.yaml (`theme.preset`) and
 * may override its accent color and fonts there.
 */

interface Palette {
  bg: string;
  surface: string;
  fg: string;
  muted: string;
  line: string;
}

interface Preset {
  /** Google Fonts family name and the axis spec to request. */
  heading: { family: string; spec?: string };
  body: { family: string; spec?: string };
  accent: string;
  light: Palette;
  dark: Palette;
  /** Heading letter-case/weight personality. */
  headingWeight: number;
  headingTracking: string;
}

export const presets = {
  editorial: {
    heading: { family: 'Instrument Serif', spec: 'ital@0;1' },
    body: { family: 'Inter', spec: 'wght@400;500;600' },
    accent: '#d9481e',
    headingWeight: 400,
    headingTracking: '-0.02em',
    light: { bg: '#f6f3ee', surface: '#ffffff', fg: '#151412', muted: '#6b665e', line: '#e2ddd4' },
    dark: { bg: '#121110', surface: '#1c1a18', fg: '#f3efe8', muted: '#a39d93', line: '#2e2b27' },
  },
  modern: {
    heading: { family: 'Inter Tight', spec: 'wght@500;600;700' },
    body: { family: 'Inter', spec: 'wght@400;500;600' },
    accent: '#3b5bfd',
    headingWeight: 600,
    headingTracking: '-0.04em',
    light: { bg: '#fafafa', surface: '#ffffff', fg: '#0b0b0c', muted: '#66666d', line: '#e6e6ea' },
    dark: { bg: '#0b0b0c', surface: '#151518', fg: '#f4f4f5', muted: '#9a9aa3', line: '#26262b' },
  },
  bold: {
    heading: { family: 'Space Grotesk', spec: 'wght@500;700' },
    body: { family: 'DM Sans', spec: 'wght@400;500;700' },
    accent: '#ff3d7f',
    headingWeight: 700,
    headingTracking: '-0.04em',
    light: { bg: '#fff8ec', surface: '#ffffff', fg: '#16130f', muted: '#6e6456', line: '#ecdfc9' },
    dark: { bg: '#14110d', surface: '#1f1a14', fg: '#fff3df', muted: '#b3a48c', line: '#342b20' },
  },
  classic: {
    heading: { family: 'Fraunces', spec: 'wght@400;600' },
    body: { family: 'Source Sans 3', spec: 'wght@400;600' },
    accent: '#2f6f4f',
    headingWeight: 400,
    headingTracking: '-0.01em',
    light: { bg: '#f4f1ea', surface: '#fffdf8', fg: '#1d1b16', muted: '#6a655a', line: '#ddd6c8' },
    dark: { bg: '#141412', surface: '#1e1d1a', fg: '#efeadf', muted: '#a49e90', line: '#302e29' },
  },
} satisfies Record<string, Preset>;

export type PresetName = keyof typeof presets;
export const presetNames = Object.keys(presets) as [PresetName, ...PresetName[]];

/** Black or white, whichever reads better on the given hex color. */
export function contrastText(hex: string): string {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return luminance > 0.4 ? '#111111' : '#ffffff';
}

/** Google Fonts stylesheet URL for a heading/body pair. */
export function fontsUrl(heading: { family: string; spec?: string }, body: { family: string; spec?: string }) {
  const families = [heading, body]
    .filter((f, i, all) => all.findIndex((o) => o.family === f.family) === i)
    .map((f) => `family=${encodeURIComponent(f.family).replace(/%20/g, '+')}${f.spec ? `:${f.spec}` : ''}`);
  return `https://fonts.googleapis.com/css2?${families.join('&')}&display=swap`;
}
