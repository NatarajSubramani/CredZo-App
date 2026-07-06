import { CZ } from '../tokens';
import Logo from './Logo';

function IconBtn({ children, dark, onClick, ariaLabel }) {
  const bg  = dark ? 'rgba(255,255,255,0.1)' : CZ.card;
  const bdr = dark ? 'rgba(255,255,255,0.15)' : CZ.border;
  const sh  = dark ? 'none' : CZ.shadowSm;
  return (
    <button
      type="button"
      className="pressable"
      onClick={onClick}
      aria-label={ariaLabel}
      style={{
        width: 44, height: 44, borderRadius: '50%',
        background: bg, border: `1px solid ${bdr}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', flexShrink: 0, boxShadow: sh,
        padding: 0,
      }}
    >
      {children}
    </button>
  );
}

export default function NavBar({ variant = 'back-step', title, step, total, dark, onBack, onHelp }) {
  const fg  = dark ? 'rgba(255,255,255,0.9)'  : CZ.text;
  const dim = dark ? 'rgba(255,255,255,0.5)'  : CZ.muted;

  if (variant === 'logo') {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 20px 12px', flexShrink: 0 }}>
        <Logo dark={dark} />
      </div>
    );
  }

  return (
    <nav aria-label="Screen navigation" style={{ display: 'flex', alignItems: 'center', padding: '0 20px 12px', gap: 8, flexShrink: 0 }}>
      <IconBtn dark={dark} onClick={onBack} ariaLabel="Go back">
        <svg aria-hidden="true" width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M11.5 4.5L7 9L11.5 13.5" stroke={fg} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </IconBtn>

      <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
        {step ? (
          <div
            aria-label={`Step ${step} of ${total}`}
            style={{
              background: dark ? 'rgba(255,255,255,0.1)' : CZ.navyLight,
              border: `1px solid ${dark ? 'rgba(255,255,255,0.12)' : CZ.navyBorder}`,
              borderRadius: 20, padding: '5px 16px',
              fontSize: 13, fontWeight: 600,
              color: dark ? 'rgba(255,255,255,0.85)' : CZ.navyMid,
            }}
          >
            Step {step} of {total}
          </div>
        ) : title ? (
          <span style={{ fontSize: 16, fontWeight: 700, color: fg }}>{title}</span>
        ) : null}
      </div>

      <IconBtn dark={dark} onClick={onHelp} ariaLabel="Get help">
        <svg aria-hidden="true" width="18" height="18" viewBox="0 0 18 18" fill="none">
          <circle cx="9" cy="9" r="7" stroke={dim} strokeWidth="1.5" />
          <path d="M7.2 7c0-1 .8-1.8 1.8-1.8s1.8.8 1.8 1.8c0 .9-.8 1.5-1.8 1.8v.6" stroke={dim} strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="9" cy="13" r=".8" fill={dim} />
        </svg>
      </IconBtn>
    </nav>
  );
}
