export default function StatusBar({ dark }) {
  const fg = dark ? 'rgba(255,255,255,0.9)' : '#0E1C3C';
  return (
    <div style={{ height: 44, flexShrink: 0, display: 'flex', alignItems: 'center', padding: '0 22px' }}>
      <span style={{ fontSize: 15, fontWeight: 700, color: fg, letterSpacing: -0.3 }}>9:41</span>
      <div style={{ flex: 1 }} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
        {/* Signal */}
        <svg width="17" height="12" viewBox="0 0 17 12" fill={fg}>
          <rect x="0"    y="8"   width="3" height="4"   rx="0.7" opacity="0.35" />
          <rect x="4.5"  y="5.5" width="3" height="6.5" rx="0.7" opacity="0.6" />
          <rect x="9"    y="2.5" width="3" height="9.5" rx="0.7" opacity="0.8" />
          <rect x="13.5" y="0"   width="3" height="12"  rx="0.7" />
        </svg>
        {/* WiFi */}
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
          <path d="M1 4C3.7 1.8 12.3 1.8 15 4"        stroke={fg} strokeWidth="1.5" strokeLinecap="round" opacity="0.35" />
          <path d="M3.2 6.5C5 5 11 5 12.8 6.5"        stroke={fg} strokeWidth="1.5" strokeLinecap="round" opacity="0.65" />
          <path d="M5.5 9C6.4 8.2 9.6 8.2 10.5 9"     stroke={fg} strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="8" cy="11.2" r="0.8" fill={fg} />
        </svg>
        {/* Battery */}
        <svg width="26" height="12" viewBox="0 0 26 12" fill="none">
          <rect x="0.5" y="1" width="21" height="10" rx="3.2" stroke={fg} strokeOpacity="0.4" strokeWidth="1" />
          <rect x="2" y="2.5" width="15" height="7" rx="2" fill={fg} />
          <path d="M22.5 4.5v3c1.2-.5 1.2-2.5 0-3z" fill={fg} opacity="0.4" />
        </svg>
      </div>
    </div>
  );
}
