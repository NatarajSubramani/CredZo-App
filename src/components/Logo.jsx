import { CZ } from '../tokens';

const SIZES = {
  sm: { box: 28, icon: 13, text: 18 },
  md: { box: 36, icon: 17, text: 22 },
  lg: { box: 44, icon: 21, text: 28 },
};

export default function Logo({ dark, size = 'md' }) {
  const s = SIZES[size] || SIZES.md;
  const textColor = dark ? 'white' : CZ.navy;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <div style={{
        width: s.box,
        height: s.box,
        borderRadius: Math.round(s.box * 0.28),
        background: dark ? 'rgba(255,255,255,0.12)' : CZ.aiGrad,
        border: `1px solid ${dark ? 'rgba(255,255,255,0.2)' : 'transparent'}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}>
        <svg width={s.icon} height={s.icon} viewBox="0 0 18 18" fill="none">
          <path d="M4 4H14L4 14H14" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <span style={{ fontSize: s.text, fontWeight: 800, color: textColor, letterSpacing: -0.5 }}>
        CredZo
      </span>
    </div>
  );
}
