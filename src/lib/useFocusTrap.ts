import { useEffect, type RefObject } from "react";

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

// Atrapa el foco del teclado dentro de `ref` mientras `active` sea true:
// enfoca el primer elemento al abrir, cicla Tab/Shift+Tab dentro del overlay
// y restaura el foco al elemento previo al cerrar. Para modales/drawers.
export function useFocusTrap(
  ref: RefObject<HTMLElement | null>,
  active: boolean
) {
  useEffect(() => {
    if (!active) return;
    const node = ref.current;
    if (!node) return;

    const prevFocused = document.activeElement as HTMLElement | null;
    const items = () =>
      Array.from(node.querySelectorAll<HTMLElement>(FOCUSABLE));

    items()[0]?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const focusables = items();
      if (focusables.length === 0) return;
      const first = focusables[0]!;
      const last = focusables[focusables.length - 1]!;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    node.addEventListener("keydown", onKey);
    return () => {
      node.removeEventListener("keydown", onKey);
      prevFocused?.focus?.();
    };
  }, [ref, active]);
}
