import { useEffect, useState } from "react";

interface Piece {
  id: number;
  x: number;
  y: number;
  color: string;
  rot: number;
  vx: number;
  vy: number;
}

const COLORS = ["#10b981", "#34d399", "#f59e0b", "#3b82f6", "#ef4444", "#a855f7"];

export function Confetti({ trigger }: { trigger: number }) {
  const [pieces, setPieces] = useState<Piece[]>([]);

  useEffect(() => {
    if (!trigger) return;
    const arr: Piece[] = Array.from({ length: 80 }, (_, i) => ({
      id: trigger * 1000 + i,
      x: 50 + (Math.random() - 0.5) * 20,
      y: 40 + (Math.random() - 0.5) * 10,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      rot: Math.random() * 360,
      vx: (Math.random() - 0.5) * 60,
      vy: -Math.random() * 40 - 20,
    }));
    setPieces(arr);
    const t = setTimeout(() => setPieces([]), 2500);
    return () => clearTimeout(t);
  }, [trigger]);

  if (!pieces.length) return null;
  return (
    <div className="pointer-events-none fixed inset-0 z-[100] overflow-hidden">
      {pieces.map((p) => (
        <span
          key={p.id}
          className="absolute block h-2 w-3 animate-[confetti_2.4s_ease-out_forwards]"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            background: p.color,
            transform: `rotate(${p.rot}deg)`,
            ["--tx" as any]: `${p.vx * 6}px`,
            ["--ty" as any]: `${p.vy * 6 + 600}px`,
          }}
        />
      ))}
      <style>{`@keyframes confetti { to { transform: translate(var(--tx), var(--ty)) rotate(720deg); opacity: 0; } }`}</style>
    </div>
  );
}