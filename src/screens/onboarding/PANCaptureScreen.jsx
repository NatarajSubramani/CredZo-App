import { useState, useEffect } from 'react';
import { CZ } from '../../tokens';
import { Screen, StatusBar, HomeIndicator, NavBar, Stepper, AIBubble, Button } from '../../components';
import { useNav, SCREENS } from '../../navigation/NavigationContext';

const PAN_W  = 264;
const PAN_H  = Math.round(PAN_W / 1.586);
const CORNER = 20;

export default function PANCaptureScreen({ errorState: errorProp }) {
  const { navigate, goBack } = useNav();
  const [errorState, setErrorState] = useState(errorProp || false);
  const [captured, setCaptured]     = useState(false);
  const [capturing, setCapturing]   = useState(false);

  const aiMsg = errorState
    ? "I couldn't read the card clearly. Ensure the card is fully in frame and the text is sharp."
    : captured
    ? "Card captured successfully! Verifying your details..."
    : "Place your PAN card flat in the frame. I'll confirm when it's ready to capture.";

  const chipStyle = errorState
    ? { bg: CZ.errorBg,   color: CZ.error,   bdr: CZ.errorBdr,   icon: '✕', text: 'Try again' }
    : captured
    ? { bg: CZ.successBg, color: CZ.success, bdr: CZ.successBdr, icon: '✓', text: 'Captured!' }
    : { bg: CZ.warningBg, color: CZ.warning, bdr: CZ.warningBdr, icon: '●', text: 'Scanning…' };

  const handleCapture = () => {
    if (capturing || captured) return;
    setCapturing(true);
    setTimeout(() => {
      // 20% chance of simulated error
      const fail = false; // in prototype always succeed for flow
      if (fail) {
        setErrorState(true);
        setCapturing(false);
      } else {
        setCaptured(true);
        setCapturing(false);
        setTimeout(() => navigate(SCREENS.PROCESSING), 900);
      }
    }, 1500);
  };

  return (
    <Screen className="screen-enter">
      <StatusBar />
      <NavBar step={2} total={3} onBack={goBack} onHelp={() => navigate(SCREENS.AI_HELP, { overlay: true })} />
      <Stepper active={2} />

      <AIBubble message={aiMsg} style={{ marginBottom: 12 }} />

      {/* Camera viewfinder */}
      <div style={{ margin: '0 16px', flexShrink: 0 }}>
        <div style={{
          height: 280, borderRadius: 20,
          background: 'linear-gradient(180deg, #0A1628 0%, #0D1F3C 100%)',
          position: 'relative', display: 'flex',
          alignItems: 'center', justifyContent: 'center',
          overflow: 'hidden',
          boxShadow: '0 4px 24px rgba(9,22,64,0.3)',
        }}>
          {/* Grid */}
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }} />

          {/* Scan line */}
          {!errorState && !captured && (
            <div style={{
              position: 'absolute', left: 0, right: 0, height: 1.5,
              background: 'linear-gradient(90deg, transparent, rgba(8,145,178,0.8), transparent)',
              animation: 'czScanLine 2.5s ease-in-out infinite',
            }} />
          )}

          {/* Success flash */}
          {captured && (
            <div style={{
              position: 'absolute', inset: 0,
              background: 'rgba(5,150,105,0.15)',
              animation: 'czFadeIn 0.3s ease',
            }} />
          )}

          {/* PAN guide */}
          <div style={{ width: PAN_W, height: PAN_H, position: 'relative' }}>
            <div style={{
              position: 'absolute', inset: 0,
              border: `2px dashed ${captured ? 'rgba(5,150,105,0.7)' : errorState ? 'rgba(220,43,43,0.7)' : 'rgba(255,255,255,0.45)'}`,
              borderRadius: 10,
              transition: 'border-color 0.3s ease',
            }} />
            {/* Corner brackets */}
            {[{ t: true, l: true }, { t: true, r: true }, { b: true, l: true }, { b: true, r: true }].map((c, i) => (
              <div key={i} style={{
                position: 'absolute', width: CORNER, height: CORNER,
                ...(c.t ? { top: -2 } : { bottom: -2 }),
                ...(c.l ? { left: -2 } : { right: -2 }),
                borderTop:    c.t ? `3px solid ${captured ? CZ.success : errorState ? CZ.error : 'white'}` : 'none',
                borderBottom: c.b ? `3px solid ${captured ? CZ.success : errorState ? CZ.error : 'white'}` : 'none',
                borderLeft:   c.l ? `3px solid ${captured ? CZ.success : errorState ? CZ.error : 'white'}` : 'none',
                borderRight:  c.r ? `3px solid ${captured ? CZ.success : errorState ? CZ.error : 'white'}` : 'none',
                transition: 'border-color 0.3s ease',
              }} />
            ))}

            {/* Card placeholder */}
            <div style={{ position: 'absolute', inset: 0, padding: 12, opacity: 0.18, display: 'flex', flexDirection: 'column', gap: 5 }}>
              <div style={{ height: 7, width: 50, background: 'white', borderRadius: 2 }} />
              <div style={{ height: 5, width: 90, background: 'white', borderRadius: 2 }} />
              <div style={{ flex: 1 }} />
              <div style={{ display: 'flex', gap: 8 }}>
                <div style={{ width: 30, height: 36, background: 'white', borderRadius: 2 }} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4, justifyContent: 'center' }}>
                  <div style={{ height: 5, width: 70, background: 'white', borderRadius: 2 }} />
                  <div style={{ height: 5, width: 50, background: 'white', borderRadius: 2 }} />
                  <div style={{ height: 5, width: 80, background: 'white', borderRadius: 2 }} />
                </div>
              </div>
            </div>

            {/* Status chip */}
            <div style={{ position: 'absolute', top: -16, right: 0 }}>
              <div style={{
                background: chipStyle.bg, color: chipStyle.color,
                border: `1px solid ${chipStyle.bdr}`,
                borderRadius: 20, padding: '4px 10px',
                fontSize: 12, fontWeight: 600,
                display: 'inline-flex', gap: 5, alignItems: 'center',
                boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
                transition: 'all 0.3s ease',
              }}>
                <span style={!errorState && !captured ? { animation: 'czPulse 1.5s infinite', display: 'inline-block' } : {}}>
                  {capturing ? '…' : chipStyle.icon}
                </span>
                <span>{capturing ? 'Capturing…' : chipStyle.text}</span>
              </div>
            </div>
          </div>

          <div style={{ position: 'absolute', bottom: 10, left: '50%', transform: 'translateX(-50%)', fontSize: 9, color: 'rgba(255,255,255,0.2)', letterSpacing: 2, whiteSpace: 'nowrap' }}>
            LIVE CAMERA VIEW
          </div>
        </div>
      </div>

      {/* Tips */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 20, padding: '10px 20px 6px', flexShrink: 0 }}>
        {[
          { label: 'Good lighting', icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="3.5" stroke={CZ.muted} strokeWidth="1.3"/><path d="M8 1.5V3M8 13v1.5M1.5 8H3M13 8h1.5M3.5 3.5L4.6 4.6M11.4 11.4l1.1 1.1M3.5 12.5l1.1-1.1M11.4 4.6l1.1-1.1" stroke={CZ.muted} strokeWidth="1.3" strokeLinecap="round"/></svg> },
          { label: 'Card flat',     icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="2" y="5" width="12" height="7.5" rx="1.5" stroke={CZ.muted} strokeWidth="1.3"/><path d="M2 8.5h12" stroke={CZ.muted} strokeWidth="1.3"/></svg> },
          { label: 'Hold steady',   icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M5.5 8V4.5a1 1 0 012 0V8m-2 0v2a3 3 0 006 0V7.5a1 1 0 00-2 0V8m-4 0h4" stroke={CZ.muted} strokeWidth="1.3" strokeLinecap="round"/></svg> },
        ].map(({ label, icon }) => (
          <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            {icon}
            <span style={{ fontSize: 11, color: CZ.muted, fontWeight: 500 }}>{label}</span>
          </div>
        ))}
      </div>

      {/* Capture button */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '8px 24px 8px', flexShrink: 0 }}>
        {errorState ? (
          <>
            <Button label="Try again" onClick={() => { setErrorState(false); setCaptured(false); }} />
            <div style={{ textAlign: 'center', marginTop: 10, fontSize: 13, color: CZ.muted }}>
              Having trouble? I can guide you step by step.
            </div>
          </>
        ) : (
          <div
            className="pressable"
            onClick={handleCapture}
            style={{ position: 'relative', width: 68, height: 68 }}
          >
            <div style={{
              position: 'absolute', inset: -8, borderRadius: '50%',
              border: `2px dashed ${captured ? CZ.success : CZ.teal}`,
              opacity: captured ? 0.8 : 0.4,
              animation: captured ? 'none' : 'czPulse 2s ease-in-out infinite',
            }} />
            <div style={{
              width: 68, height: 68, borderRadius: '50%',
              background: captured ? CZ.success : CZ.navy,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 4px 20px rgba(12,30,72,0.35)',
              transition: 'background 0.3s ease',
            }}>
              {captured ? (
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <path d="M6 14L11 19L22 8" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : capturing ? (
                <div style={{ width: 20, height: 20, borderRadius: '50%', border: '2px solid white', borderTopColor: 'transparent', animation: 'czSpin 0.7s linear infinite' }} />
              ) : (
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <rect x="3" y="6" width="22" height="17" rx="3.5" stroke="white" strokeWidth="1.8" />
                  <circle cx="14" cy="14.5" r="5" stroke="white" strokeWidth="1.8" />
                  <circle cx="14" cy="14.5" r="2.5" fill="white" />
                  <rect x="18" y="6" width="4" height="3" rx="1" fill="white" />
                </svg>
              )}
            </div>
          </div>
        )}
      </div>

      <div style={{ flex: 1 }} />
      <div style={{ textAlign: 'center', padding: '4px 28px 4px', fontSize: 11, color: CZ.muted, lineHeight: 1.5 }}>
        Your PAN data is encrypted and used only for identity verification.
      </div>
      <HomeIndicator />
    </Screen>
  );
}
