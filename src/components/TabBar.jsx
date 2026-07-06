import { CZ } from '../tokens';

const TABS = [
  {
    label: 'Dashboard',
    icon: (a) => (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <rect x="2"    y="2"    width="8.5" height="8.5" rx="2.5" fill={a ? CZ.navy : CZ.muted} opacity={a ? 1    : 0.45} />
        <rect x="11.5" y="2"    width="8.5" height="8.5" rx="2.5" fill={a ? CZ.navy : CZ.muted} opacity={a ? 0.45 : 0.25} />
        <rect x="2"    y="11.5" width="8.5" height="8.5" rx="2.5" fill={a ? CZ.navy : CZ.muted} opacity={a ? 0.45 : 0.25} />
        <rect x="11.5" y="11.5" width="8.5" height="8.5" rx="2.5" fill={a ? CZ.navy : CZ.muted} opacity={a ? 1    : 0.45} />
      </svg>
    ),
  },
  {
    label: 'History',
    icon: (a) => (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <circle cx="11" cy="11" r="8" stroke={a ? CZ.navy : CZ.muted} strokeWidth="1.6" opacity={a ? 1 : 0.5} />
        <path d="M11 7v4.4L13.8 13" stroke={a ? CZ.navy : CZ.muted} strokeWidth="1.6" strokeLinecap="round" opacity={a ? 1 : 0.5} />
      </svg>
    ),
  },
  {
    label: 'Offers',
    icon: (a) => (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path
          d="M11 2.5l2.2 5.5H19l-4.5 3.2 1.8 5.5L11 13.8 5.7 16.7l1.8-5.5L3 8l5.8-.1z"
          fill={a ? CZ.navy : 'none'}
          stroke={a ? CZ.navy : CZ.muted}
          strokeWidth="1.5"
          strokeLinejoin="round"
          opacity={a ? 1 : 0.5}
        />
      </svg>
    ),
  },
  {
    label: 'Profile',
    icon: (a) => (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <circle cx="11" cy="8" r="4" stroke={a ? CZ.navy : CZ.muted} strokeWidth="1.6" opacity={a ? 1 : 0.5} />
        <path d="M3 20c0-4.4 3.6-8 8-8s8 3.6 8 8" stroke={a ? CZ.navy : CZ.muted} strokeWidth="1.6" strokeLinecap="round" opacity={a ? 1 : 0.5} />
      </svg>
    ),
  },
];

export default function TabBar({ active = 0, onTab }) {
  return (
    <div style={{
      display: 'flex',
      background: CZ.card,
      borderTop: `1px solid ${CZ.border}`,
      flexShrink: 0,
    }}>
      {TABS.map((t, i) => (
        <div
          key={t.label}
          className="pressable"
          onClick={() => onTab?.(i)}
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '10px 0 6px',
            gap: 3,
            cursor: 'pointer',
          }}
        >
          {t.icon(i === active)}
          <span style={{
            fontSize: 10.5,
            fontWeight: i === active ? 700 : 400,
            color: i === active ? CZ.navy : CZ.muted,
            transition: 'color 0.2s ease',
          }}>
            {t.label}
          </span>
        </div>
      ))}
    </div>
  );
}
