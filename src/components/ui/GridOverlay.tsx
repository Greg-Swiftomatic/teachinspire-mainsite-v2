interface GridOverlayProps {
  variant?: 'dark' | 'light';
}

export function GridOverlay({ variant = 'dark' }: GridOverlayProps) {
  const color = variant === 'dark' ? 'bg-navy' : 'bg-cream';

  return (
    <div className="absolute inset-0 opacity-[0.02] pointer-events-none" aria-hidden="true">
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className={`absolute top-0 bottom-0 w-px ${color}`}
          style={{ left: `${(i + 1) * (100 / 12)}%` }}
        />
      ))}
    </div>
  );
}
