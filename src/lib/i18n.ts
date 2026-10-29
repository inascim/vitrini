/**
 * Built-in interface labels. Owners override any of them per Locale with the
 * `ui:` map in content/locales/<locale>.yaml. A Locale without a built-in
 * dictionary falls back to English for labels it doesn't override.
 */
const en = {
  'nav.cases': 'Work',
  'nav.about': 'About',
  'nav.services': 'Services',
  'nav.testimonials': 'Testimonials',
  'nav.contact': 'Contact',
  'section.cases': 'Selected work',
  'section.about': 'About',
  'section.services': 'Services',
  'section.clients': 'Brands I have worked with',
  'section.testimonials': 'What people say',
  'section.contact': "Let's work together",
  'cases.all': 'All',
  'cases.view': 'View case',
  'cases.back': 'All work',
  'cases.next': 'Next case',
  'cases.client': 'Client',
  'cases.role': 'Role',
  'cases.year': 'Year',
  'cases.results': 'Results',
  'cases.gallery': 'Gallery',
  'cases.links': 'Links',
  'cases.untranslated': 'This page is not available in {language} yet. Showing the {fallback} version.',
  'contact.email': 'Send an email',
  'contact.whatsapp': 'Message on WhatsApp',
  'language.label': 'Language',
  'consent.text': 'This site uses cookies to understand how visitors use it.',
  'consent.accept': 'Accept',
  'consent.decline': 'Decline',
  'footer.rights': 'All rights reserved.',
  'notFound.title': 'Page not found',
  'notFound.back': 'Back to the home page',
  'media.open': 'Open on {platform}',
  'a11y.skip': 'Skip to content',
};

export type UiKey = keyof typeof en;
type Dictionary = Record<UiKey, string>;

const pt: Dictionary = {
  'nav.cases': 'Trabalhos',
  'nav.about': 'Sobre',
  'nav.services': 'Serviços',
  'nav.testimonials': 'Depoimentos',
  'nav.contact': 'Contato',
  'section.cases': 'Trabalhos selecionados',
  'section.about': 'Sobre',
  'section.services': 'Serviços',
  'section.clients': 'Marcas com quem trabalhei',
  'section.testimonials': 'O que dizem',
  'section.contact': 'Vamos trabalhar juntos',
  'cases.all': 'Todos',
  'cases.view': 'Ver case',
  'cases.back': 'Todos os trabalhos',
  'cases.next': 'Próximo case',
  'cases.client': 'Cliente',
  'cases.role': 'Função',
  'cases.year': 'Ano',
  'cases.results': 'Resultados',
  'cases.gallery': 'Galeria',
  'cases.links': 'Links',
  'cases.untranslated': 'Esta página ainda não está disponível em {language}. Exibindo a versão em {fallback}.',
  'contact.email': 'Enviar e-mail',
  'contact.whatsapp': 'Conversar no WhatsApp',
  'language.label': 'Idioma',
  'consent.text': 'Este site usa cookies para entender como os visitantes o utilizam.',
  'consent.accept': 'Aceitar',
  'consent.decline': 'Recusar',
  'footer.rights': 'Todos os direitos reservados.',
  'notFound.title': 'Página não encontrada',
  'notFound.back': 'Voltar para a página inicial',
  'media.open': 'Abrir no {platform}',
  'a11y.skip': 'Pular para o conteúdo',
};

const es: Dictionary = {
  'nav.cases': 'Trabajos',
  'nav.about': 'Sobre mí',
  'nav.services': 'Servicios',
  'nav.testimonials': 'Testimonios',
  'nav.contact': 'Contacto',
  'section.cases': 'Trabajos seleccionados',
  'section.about': 'Sobre mí',
  'section.services': 'Servicios',
  'section.clients': 'Marcas con las que he trabajado',
  'section.testimonials': 'Lo que dicen',
  'section.contact': 'Trabajemos juntos',
  'cases.all': 'Todos',
  'cases.view': 'Ver caso',
  'cases.back': 'Todos los trabajos',
  'cases.next': 'Siguiente caso',
  'cases.client': 'Cliente',
  'cases.role': 'Rol',
  'cases.year': 'Año',
  'cases.results': 'Resultados',
  'cases.gallery': 'Galería',
  'cases.links': 'Enlaces',
  'cases.untranslated': 'Esta página aún no está disponible en {language}. Mostrando la versión en {fallback}.',
  'contact.email': 'Enviar un correo',
  'contact.whatsapp': 'Escribir por WhatsApp',
  'language.label': 'Idioma',
  'consent.text': 'Este sitio usa cookies para entender cómo lo utilizan los visitantes.',
  'consent.accept': 'Aceptar',
  'consent.decline': 'Rechazar',
  'footer.rights': 'Todos los derechos reservados.',
  'notFound.title': 'Página no encontrada',
  'notFound.back': 'Volver a la página de inicio',
  'media.open': 'Abrir en {platform}',
  'a11y.skip': 'Saltar al contenido',
};

const builtIn: Record<string, Dictionary> = { en, pt, es };

/** Returns a translator for a Locale, applying the Owner's overrides. */
export function translator(locale: string, overrides: Record<string, string> = {}) {
  const dict = { ...en, ...(builtIn[locale] ?? builtIn[locale.split('-')[0]] ?? {}), ...overrides };
  return (key: UiKey, vars: Record<string, string> = {}) =>
    dict[key].replace(/\{(\w+)\}/g, (_, name: string) => vars[name] ?? `{${name}}`);
}

export type Translate = ReturnType<typeof translator>;

/** The name of a language written in that language, e.g. "pt" → "Português". */
export function nativeLanguageName(locale: string) {
  const name = new Intl.DisplayNames([locale], { type: 'language' }).of(locale) ?? locale;
  return name.charAt(0).toLocaleUpperCase(locale) + name.slice(1);
}

/** The name of a language written in another language, e.g. ("es", "pt") → "português". */
export function languageNameIn(locale: string, inLocale: string) {
  return new Intl.DisplayNames([inLocale], { type: 'language' }).of(locale) ?? locale;
}
