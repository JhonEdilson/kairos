export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="h-1 w-24 overflow-hidden rounded bg-white/10">
        <div
          className="h-full w-1/3 bg-emerald-500"
          style={{ animation: "loading 1s ease-in-out infinite" }}
        />
      </div>
      <style>{`@keyframes loading{0%{transform:translateX(-100%)}100%{transform:translateX(300%)}}`}</style>
    </div>
  );
}
