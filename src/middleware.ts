import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// El middleware de next-intl intercepta TODO request y redirige a /es o /en
// si el path no tiene locale. Tambien maneja la deteccion Accept-Language.
export default createMiddleware(routing);

export const config = {
  // Incluye todas las rutas menos estaticos de Next, api internos y archivos
  // con extension (ej. favicon.ico, og.png).
  matcher: "/((?!api|_next|_vercel|.*\\..*).*)",
};
