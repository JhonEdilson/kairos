<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Problemas conocidos

### Turbopack FATAL — "reading file nul" / "Función incorrecta (os error 1)"

Si `pnpm dev` falla con un panic de Turbopack sobre `globals.css` y el path termina en `\nul`, hay un archivo `nul` en la raíz del proyecto (nombre reservado de Windows que revienta el filesystem de Turbopack).

**Fix rápido:**
```bash
rm -f nul                              # solo Git Bash puede eliminarlo
Remove-Item -Recurse -Force .next      # limpiar cache (PowerShell)
pnpm dev
```

Documentación completa: [`docs/troubleshooting/turbopack-nul-file.md`](docs/troubleshooting/turbopack-nul-file.md)

## Brand Identity

Antes de tocar UI, consultar `brand-assets/brand-book/brand-book.html` (abrir en Chrome).

Tokens canónicos viven en `src/app/globals.css:4-13`. **Nunca hardcodear hex** — siempre `var(--token)`.
Acento único: `--accent: #D97706` (burnt orange). Segundo color de acento = violación de marca.

Logo en construcción (Fase 3). El wordmark actual es tipográfico en `Nav.tsx`.
Favicon pendiente hasta que el logo esté aprobado.
