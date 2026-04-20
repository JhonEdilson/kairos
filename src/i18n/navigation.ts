import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

// Wrappers tipados de Link/router/usePathname/redirect que
// auto-inyectan el locale actual en todas las rutas. Usar siempre estos
// en componentes de la app — nunca next/link o next/navigation directos.
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
