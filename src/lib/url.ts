const base = import.meta.env.BASE_URL.replace(/\/$/, '');

/** Prefixes a site path with the deploy base path (e.g. "/portfolio"). */
export function href(path = '') {
  return `${base}/${path.replace(/^\//, '')}`;
}

export function localeHref(locale: string, path = '') {
  const clean = path.replace(/^\/|\/$/g, '');
  return href(clean ? `${locale}/${clean}/` : `${locale}/`);
}

export function caseHref(locale: string, slug: string) {
  return localeHref(locale, `cases/${slug}`);
}

export function whatsappHref(number: string) {
  return `https://wa.me/${number.replace(/\D/g, '')}`;
}
