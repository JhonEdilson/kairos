// Utility tipo clsx — une clases y filtra falsy.
// Evita dependencia externa para algo tan simple.
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}
