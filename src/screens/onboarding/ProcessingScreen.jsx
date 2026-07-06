import { useState, useEffect } from 'react';
import { CZ } from '../../tokens';
import { Screen, StatusBar, HomeIndicator, Logo, ProgressRing } from '../../components';
import { useNav, SCREENS } from '../../navigation/NavigationContext';

const STAGES = [
  { label: 'Checking your PAN details',       duration: 2000 },
  { label: 'Confirming your Aadhaar',         duration: 2500 },
  { label: 'Assessing your credit profile',   duration: 3000 },
];

export default function ProcessingScreen() {
  const { navigate } = useNav();
  const [stage, setStage]       = useState(0); // 0 = first processing, 3 = complete
  const [pct, setPct]           = useState(0.1);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    let timeout;
    const totalDuration = STAGES.reduce((s, st) => s + st.duration, 0);
    const advance = (idx, elapsed) => {
      if (idx >= STAGES.length) {
        setPct(1.0);
        setComplete(true);
        setStage(STAGES.length);
        timeout = setTimeout(() => navigate(SCREENS.CREDIT_REVEAL), 2000);
        return;
      }
      setStage(idx);
      const progress = (elapsed + STAGES[idx].duration / 2) / totalDuration;
      setPct(Math.min(progress, 0.95));
      timeout = setTimeout(() => advance(idx + 1, elapsed + STAGES[idx].duration), STAGES[idx].duration);
    };
    advance(0, 0);
    return () => clearTimeout(timeout);
  }, []);

  const ringColor = complete ? CZ.success : CZ.teal;

  return (
    <Screen bg={CZ.heroGrad} className="screen-enter">
      <StatusBar dark />

      <div style={{ display: 'flex', justifyContent: 'center', padding: '0 20px 16px', flexShrink: 0 }}>
        <Logo dark size="md" />
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 28px 20px', gap: 20 }}>
        {/* Progress ring */}
        <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
          <ProgressRing pct={pct} size={96} color={ringColor} trackColor="rgba(255,255,255,0.1)" />
          <div style={{ position: 'absolute', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {complete ? (
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" style={{ animation: 'czSuccessPop 0.5s ease' }}>
                <path d="M6 16L13 23L26 10" stroke={CZ.success} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ) : (
              <span style={{ fontSize: 18, fontWeight: 800, color: 'white', animation: 'czCountUp 0.3s ease' }}>
                {Math.round(pct * 100)}%
              </span>
            )}
          </div>
        </div>

        {/* Title */}
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 22, fontWeight: 800, color: 'white', letterSpacing: -0.4, transition: 'all 0.4s ease' }}>
            {complete ? 'Verification complete' : 'Verifying your identity…'}
          </div>
          {!complete && (
            <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', marginTop: 6 }}>
              This usually takes less than 15 seconds
            </div>
          )}
        </div>

        {/* Status card */}
        <div style={{
          width: '100%',
          background: 'rgba(255,255,255,0.07)',
          backdropFilter: 'blur(12px)',
          borderRadius: 20,
          border: '1px solid rgba(255,255,255,0.12)',
          padding: '16px',
          boxShadow: '0 8px 32px rgba(9,22,64,0.3)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
            <div style={{ width: 26, height: 26, borderRadius: '50%', background: CZ.aiGrad, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M5 1L6.2 4H9.5L6.9 5.8L7.9 9L5 7.2L2.1 9L3.1 5.8L.5 4H3.8L5 1Z" fill="white" />
              </svg>
            </div>
            <span style={{ fontSize: 11, fontWeight: 700, color: CZ.teal, letterSpacing: 0.5, textTransform: 'uppercase' }}>Live Status</span>
          </div>

          {STAGES.map((s, i) => {
            const done   = i < stage;
            const active = i === stage && !complete;
            return (
              <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: i < STAGES.length - 1 ? 12 : 0 }}>
                <div style={{
                  width: 22, height: 22, borderRadius: '50%', flexShrink: 0,
                  background: done ? CZ.successBg : active ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.05)',
                  border: `1px solid ${done ? CZ.successBdr : active ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.08)'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all 0.4s ease',
                }}>
                  {done ? (
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M2 5L4.2 7.2L8 3" stroke={CZ.success} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : active ? (
                    <div style={{ width: 7, height: 7, borderRadius: '50%', border: '1.5px solid rgba(255,255,255,0.6)', borderTopColor: 'transparent', animation: 'czSpin 0.9s linear infinite' }} />
                  ) : (
                    <div style={{ width: 5, height: 5, borderRadius: '50%', background: 'rgba(255,255,255,0.2)' }} />
                  )}
                </div>
                <span style={{
                  fontSize: 13.5,
                  color: done ? 'white' : active ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.35)',
                  fontWeight: (done || active) ? 500 : 400,
                  transition: 'color 0.4s ease',
                }}>
                  {s.label}
                </span>
              </div>
            );
          })}

          {complete && (
            <div style={{
              marginTop: 14, padding: '12px 14px',
              background: 'rgba(5,150,105,0.15)', borderRadius: 12,
              border: `1px solid ${CZ.successBdr}`,
              animation: 'czSlideUp 0.4s ease',
            }}>
              <span style={{ fontSize: 14, color: '#6EE7B7', fontWeight: 500 }}>
                Everything checks out, Arun. Your limit is ready! 🎉
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Bottom */}
      <div style={{ padding: '0 28px 16px', flexShrink: 0 }}>
        {complete ? (
          <div>
            <div style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.5)', textAlign: 'center', marginBottom: 10 }}>
              Preparing your personalised offer…
            </div>
            <div style={{ height: 4, background: 'rgba(255,255,255,0.1)', borderRadius: 2, overflow: 'hidden' }}>
              <div style={{ height: '100%', background: CZ.aiGrad, borderRadius: 2, animation: 'czProgressFill 1.8s ease forwards' }} />
            </div>
          </div>
        ) : (
          <p style={{ textAlign: 'center', fontSize: 13, color: 'rgba(255,255,255,0.45)', lineHeight: 1.6, margin: 0 }}>
            Please keep the app open. Your information is being securely verified.
          </p>
        )}
        <HomeIndicator dark />
      </div>
    </Screen>
  );
}
