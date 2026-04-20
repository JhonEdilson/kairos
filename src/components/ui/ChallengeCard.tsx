type Props = {
  stat: string;
  title: string;
  desc: string;
};

export function ChallengeCard({ stat, title, desc }: Props) {
  return (
    <div className="p-6 border border-[color:var(--border-strong)] hover:border-[color:var(--accent)]/30 transition-colors">
      <div className="font-display text-3xl font-medium tracking-[-0.02em] text-[color:var(--accent)]">
        {stat}
      </div>
      <div className="mt-2 font-medium text-base">{title}</div>
      <div className="mt-1 text-sm text-[color:var(--fg-muted)] leading-relaxed">{desc}</div>
    </div>
  );
}
