const escape = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Escapes text and turns *words* into <em>words</em> (rendered in the accent style). */
export function emphasis(text: string) {
  return escape(text).replace(/\*([^*]+)\*/g, '<em>$1</em>');
}

export function year(date: Date) {
  return String(date.getUTCFullYear());
}
