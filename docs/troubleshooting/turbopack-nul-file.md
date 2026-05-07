# Turbopack Fatal Error: archivo `nul` en la raíz del proyecto

## Síntoma

El servidor de desarrollo falla con este error en el terminal de `pnpm dev` / `npx next dev`:

```
FATAL: An unexpected Turbopack error occurred.
Failed to write app endpoint /[locale]/page

Caused by:
- [project]/src/app/globals.css [app-client] (css)
- reading file "C:\Users\USER\Documents\Programación\kairos-studio\nul"
- Función incorrecta. (os error 1)
```

En el navegador aparece el mensaje genérico:
> An unexpected Turbopack error occurred. Please see the output of `next dev` for more details.

## Causa raíz

Existe un archivo llamado `nul` en la raíz del proyecto (`kairos-studio/nul`).

En Windows, `nul` es un nombre de dispositivo reservado del sistema (equivalente a `/dev/null` en Unix). Turbopack escanea el directorio del proyecto para construir su grafo de módulos CSS. Al encontrar una entrada NTFS llamada `nul`, intenta leerla como un asset. Windows devuelve `ERROR_INVALID_FUNCTION` (os error 1) porque intercepta el nombre como el dispositivo NUL del sistema — y eso revienta toda la compilación de CSS.

El archivo suele crearse accidentalmente cuando algún comando redirige a `/dev/null` desde Git Bash en Windows y el shell no resuelve el path correctamente, por ejemplo:

```bash
some_command > /dev/null  # puede crear ./nul en Windows en algunos contextos
```

## Diagnóstico rápido

Verificar si el archivo existe:

```bash
# En Git Bash
ls -la nul
```

Si aparece en el listado, es el culpable.

> **Nota:** `Test-Path 'nul'` en PowerShell devuelve `False` aunque el archivo exista, porque PowerShell resuelve `nul` como dispositivo antes de tocar el filesystem. No confiar en esa verificación.

## Fix

**Paso 1 — Eliminar el archivo** (solo funciona desde Git Bash, no desde PowerShell):

```bash
cd "C:\Users\USER\Documents\Programación\kairos-studio"
rm -f nul
```

PowerShell `Remove-Item` y .NET `File.Delete` fallan silenciosamente o con "Acceso denegado" porque interceptan `nul` como dispositivo. Git Bash usa `DeleteFileW` con semántica POSIX y sí puede eliminarlo.

**Paso 2 — Limpiar el cache de Turbopack** (obligatorio — Turbopack cachea el path fallido):

```powershell
Remove-Item -Recurse -Force .next
```

**Paso 3 — Reiniciar el servidor:**

```bash
pnpm dev
```

## Prevención

Agregar al `.gitignore`:

```
nul
```

Esto no impide que se cree el archivo, pero sí evita que se suba al repositorio si alguien más lo genera.
