"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 p-8 bg-black text-white">
      <h1 className="text-4xl font-medium">Algo se rompió.</h1>
      <p className="text-white/60">
        Intenta recargar. Si persiste, escríbenos al WhatsApp.
      </p>
      <button
        onClick={reset}
        className="rounded-md bg-emerald-500 px-4 py-2 text-black font-medium"
      >
        Reintentar
      </button>
      {error.digest && (
        <p className="font-mono text-xs text-white/30">ID: {error.digest}</p>
      )}
    </div>
  );
}
