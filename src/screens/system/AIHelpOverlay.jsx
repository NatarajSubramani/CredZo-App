import { useState } from 'react';
import { CZ } from '../../tokens';
import { Screen, HomeIndicator, Button } from '../../components';
import { useNav } from '../../navigation/NavigationContext';

const HELP_TILES = [
  { icon: <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><rect x="3" y="3" width="16" height="13" rx="3" stroke="#3A5080" strokeWidth="1.5"/><circle cx="11" cy="9.5" r="3" stroke="#3A5080" strokeWidth="1.5"/><circle cx="11" cy="9.5" r="1.2" fill="#3A5080"/></svg>, label: 'Camera not working',
    answer: 'Go to phone Settings → Apps → CredZo → Permissions → Camera → Allow. Return to the app and try again.' },
  { icon: <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><rect x="5" y="2" width="12" height="18" rx="3" stroke="#3A5080" strokeWidth="1.5"/><path d="M8.5 15.5h5" stroke="#3A5080" strokeWidth="1.5" strokeLinecap="round"/><path d="M9 8l2 2 2-2" stroke="#3A5080" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>, label: 'OTP not received',
    answer: 'Check that your Aadhaar-registered mobile number is active and has good network signal. If the SIM is in a dual-SIM phone, ensure the correct slot is active.' },
  { icon: <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M11 2L3 5.5v5c0 4.6 3.4 8.3 8 9 4.6-.7 8-4.4 8-9v-5L11 2z" stroke="#3A5080" strokeWidth="1.5"/><path d="M8 11.5l2 2 4-4" stroke="#3A5080" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>, label: 'What is UIDAI?',
    answer: 'UIDAI (Unique Identification Authority of India) is the government body that manages Aadhaar. They verify your identity securely — your Aadhaar number is never stored by CredZo.' },
  { icon: <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><rect x="2" y="7" width="18" height="13" rx="3" stroke="#3A5080" strokeWidth="1.5"/><path d="M7 7V6a4 4 0 018 0v1" stroke="#3A5080" strokeWidth="1.5"/><circle cx="11" cy="13.5" r="1.5" fill="#3A5080"/><path d="M11 15v2" stroke="#3A5080" strokeWidth="1.5" strokeLinecap="round"/></svg>, label: 'Is my data safe?',
    answer: 'Yes. All data is encrypted with 256-bit SSL. We are an RBI-registered NBFC and follow strict data protection regulations. Your Aadhaar is used only for one-time verification.' },
];

export default function AIHelpOverlay() {
  const { dismissOverlay } = useNav();
  const [expanded, setExpanded] = useState(HELP_TILES[0].label);

  return (
    <div style={{
      position: 'absolute', inset: 0,
      background: 'rgba(9,22,64,0.92)',
      display: 'flex', flexDirection: 'column',
      zIndex: 100,
      animation: 'czFadeIn 0.2s ease',
    }}>
      {/* Dimmed background hint */}
      <div style={{ height: 200, flexShrink: 0, padding: '44px 24px 20px', position: 'relative' }}>
        <div style={{ opacity: 0.12 }}>
          {[{ w: '42%' }, { w: '68%' }, { w: '55%' }, { w: '78%' }].map((l, i) => (
            <div key={i} style={{ height: i % 2 === 0 ? 10 : 7, width: l.w, background: 'white', borderRadius: 3, marginBottom: 10 }} />
          ))}
        </div>
        <div style={{ position: 'absolute', bottom: 16, left: '50%', transform: 'translateX(-50%)', whiteSpace: 'nowrap', fontSize: 9, color: 'rgba(255,255,255,0.2)', letterSpacing: 1.5 }}>
          CURRENT SCREEN (DIMMED)
        </div>
      </div>

      {/* Bottom sheet */}
      <div style={{
        flex: 1, background: CZ.card,
        borderRadius: '28px 28px 0 0',
        display: 'flex', flexDirection: 'column',
        overflow: 'hidden',
        boxShadow: '0 -8px 40px rgba(9,22,64,0.4)',
        animation: 'czSlideUp 0.32s cubic-bezier(0.22,1,0.36,1) both',
      }}>
        {/* Handle */}
        <div style={{ display: 'flex', justifyContent: 'center', padding: '12px 0 8px' }}>
          <div style={{ width: 40, height: 4, borderRadius: 2, background: CZ.border }} />
        </div>

        {/* Sheet header */}
        <div style={{ display: 'flex', alignItems: 'center', padding: '0 20px 12px', gap: 10, borderBottom: `1px solid ${CZ.border}`, flexShrink: 0 }}>
          <div style={{
            width: 36, height: 36, borderRadius: '50%',
            background: CZ.aiGrad, flexShrink: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 2px 10px rgba(8,145,178,0.3)',
          }}>
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
              <path d="M7.5 1.5L9 5.5H13.5L10 8L11.5 12.5L7.5 10L3.5 12.5L5 8L1.5 5.5H6L7.5 1.5Z" fill="white" opacity="0.95" />
            </svg>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 16, fontWeight: 800, color: CZ.text, letterSpacing: -0.2 }}>CredZo Guide</div>
            <div style={{ fontSize: 11, color: CZ.muted }}>Here to help at every step</div>
          </div>
          <div
            className="pressable"
            onClick={dismissOverlay}
            style={{
              width: 32, height: 32, borderRadius: '50%',
              border: `1px solid ${CZ.border}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', fontSize: 16, color: CZ.muted,
            }}
          >
            ×
          </div>
        </div>

        {/* Contextual message */}
        <div style={{ padding: '10px 20px 6px', flexShrink: 0 }}>
          <div style={{
            background: CZ.tealSurface, borderRadius: 12,
            border: `1px solid ${CZ.tealBorder}`, padding: '10px 14px',
          }}>
            <p style={{ fontSize: 13.5, color: '#0C3540', lineHeight: 1.55, margin: 0 }}>
              I noticed you might need help. Here are the most common issues and quick fixes:
            </p>
          </div>
        </div>

        {/* 2×2 help tiles */}
        <div style={{ padding: '8px 20px', flexShrink: 0 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {HELP_TILES.map((t, i) => (
              <div
                key={i}
                className="pressable"
                onClick={() => setExpanded(expanded === t.label ? null : t.label)}
                style={{
                  background: expanded === t.label ? CZ.navyLight : CZ.card,
                  borderRadius: 14, padding: '12px 12px',
                  border: `1.5px solid ${expanded === t.label ? CZ.navyBorder : CZ.border}`,
                  display: 'flex', alignItems: 'center', gap: 10,
                  cursor: 'pointer',
                  boxShadow: CZ.shadowSm,
                  transition: 'all 0.2s ease',
                }}
              >
                {t.icon}
                <span style={{ fontSize: 12.5, fontWeight: 600, color: CZ.text, lineHeight: 1.35 }}>{t.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Expanded answer */}
        {expanded && (() => {
          const tile = HELP_TILES.find(t => t.label === expanded);
          return tile ? (
            <div className="scroll-hidden" style={{ flex: 1, overflow: 'auto', padding: '0 20px 8px' }}>
              <div style={{ borderRadius: 12, border: `1px solid ${CZ.border}`, overflow: 'hidden' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 14px', background: CZ.subtle, borderBottom: `1px solid ${CZ.border}` }}>
                  <span style={{ fontSize: 13.5, fontWeight: 700, color: CZ.text }}>{expanded}</span>
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M13 11L9 7L5 11" stroke={CZ.navyMid} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div style={{ padding: '12px 14px', fontSize: 13, color: CZ.textMd, lineHeight: 1.6, animation: 'czSlideUp 0.2s ease' }}>
                  {tile.answer}
                </div>
              </div>
            </div>
          ) : null;
        })()}

        <div style={{ flex: 1 }} />

        {/* Escalation row */}
        <div style={{ borderTop: `1px solid ${CZ.border}`, padding: '12px 20px', flexShrink: 0, background: CZ.card }}>
          <div style={{ fontSize: 12.5, color: CZ.muted, marginBottom: 10, textAlign: 'center' }}>Still stuck? Reach a human instantly.</div>
          <div style={{ display: 'flex', gap: 10 }}>
            <Button label="💬 Chat with support" style={{ flex: 1, height: 48, fontSize: 14 }} onClick={() => {}} />
            <Button variant="outline" label="📞 Call us" style={{ flex: 1, height: 48, fontSize: 14 }} onClick={() => {}} />
          </div>
        </div>
        <HomeIndicator />
      </div>
    </div>
  );
}
