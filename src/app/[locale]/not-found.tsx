import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 p-8 bg-black text-white">
      <h1 className="text-5xl font-medium">404</h1>
      <p className="text-white/60">Página no encontrada.</p>
      <Link href="/" className="underline text-emerald-400 hover:text-emerald-300">
        Volver al inicio
      </Link>
    </div>
  );
}
