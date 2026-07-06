import { CZ } from '../tokens';

export default function ProgressRing({ pct, size = 88, color, trackColor }) {
  const sw   = 6;
  const r    = size / 2 - sw;
  const circ = 2 * Math.PI * r;
  return (
    <svg width={size} height={size} style={{ display: 'block' }}>
      <circle
        cx={size / 2} cy={size / 2} r={r}
        fill="none"
        stroke={trackColor || CZ.border}
        strokeWidth={sw}
      />
      <circle
        cx={size / 2} cy={size / 2} r={r}
        fill="none"
        stroke={color || CZ.navy}
        strokeWidth={sw}
        strokeDasharray={circ}
        strokeDashoffset={circ * (1 - Math.min(pct, 1))}
        strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        style={{ transition: 'stroke-dashoffset 0.8s cubic-bezier(0.4,0,0.2,1)' }}
      />
    </svg>
  );
}
