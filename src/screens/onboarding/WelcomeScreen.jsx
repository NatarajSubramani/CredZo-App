import { CZ } from '../../tokens';
import { Screen, StatusBar, HomeIndicator, Logo, Button, AIBubble } from '../../components';
import { useNav, SCREENS } from '../../navigation/NavigationContext';

export default function WelcomeScreen() {
  const { navigate } = useNav();
  return (
    <Screen bg={CZ.heroGrad} className="screen-fade">
      <StatusBar dark />

      {/* Hero */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '8px 28px 32px', position: 'relative', overflow: 'hidden' }}>
        {/* Mesh dots — decorative */}
        <svg aria-hidden="true" style={{ position: 'absolute', inset: 0, opacity: 0.04, pointerEvents: 'none' }} width="390" height="500">
          {Array.from({ length: 12 }).map((_, row) =>
            Array.from({ length: 14 }).map((_, col) => (
              <circle key={`${row}-${col}`} cx={col * 30 + 15} cy={row * 34 + 17} r="2" fill="white" />
            ))
          )}
        </svg>
        <div aria-hidden="true" style={{ position: 'absolute', bottom: -40, left: -60, width: 280, height: 280, borderRadius: '50%', background: 'radial-gradient(circle, rgba(14,165,201,0.15) 0%, transparent 65%)', pointerEvents: 'none' }} />
        <div aria-hidden="true" style={{ position: 'absolute', top: 40, right: -80, width: 240, height: 240, borderRadius: '50%', background: 'radial-gradient(circle, rgba(26,75,158,0.25) 0%, transparent 60%)', pointerEvents: 'none' }} />

        {/* Logo + RBI badge */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
          <Logo dark size="md" />
          <div aria-label="RBI Registered NBFC" style={{
            display: 'flex', alignItems: 'center', gap: 5,
            background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: 20, padding: '5px 10px',
          }}>
            <svg aria-hidden="true" width="12" height="14" viewBox="0 0 12 14" fill="none">
              <path d="M6 1L1 3.5v4C1 10.5 3.2 12.8 6 13.5c2.8-.7 5-3 5-6v-4L6 1z" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.3" />
            </svg>
            <span aria-hidden="true" style={{ fontSize: 10.5, color: 'rgba(255,255,255,0.7)', fontWeight: 500 }}>RBI Registered</span>
          </div>
        </div>

        {/* Language pills */}
        <div style={{ display: 'flex', gap: 6, marginTop: 16, marginBottom: 'auto' }}>
          {['EN', 'हिंदी', 'தமிழ்'].map((l, i) => (
            <button
              key={l}
              type="button"
              aria-pressed={i === 0}
              aria-label={`Switch language to ${l}`}
              className="pressable"
              style={{
                padding: '5px 12px', borderRadius: 16,
                background: i === 0 ? 'rgba(255,255,255,0.18)' : 'transparent',
                color: i === 0 ? 'white' : 'rgba(255,255,255,0.45)',
                border: `1px solid ${i === 0 ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.12)'}`,
                fontSize: 12.5, fontWeight: i === 0 ? 700 : 400, cursor: 'pointer',
              }}
            >
              {l}
            </button>
          ))}
        </div>

        {/* Headline */}
        <div style={{ marginTop: 28 }}>
          <h1 style={{ fontSize: 36, fontWeight: 800, color: 'white', margin: '0 0 12px', letterSpacing: -0.8, lineHeight: 1.15 }}>
            Credit that works<br />as fast as you do.
          </h1>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.6)', margin: 0, lineHeight: 1.6 }}>
            Check your eligibility in under 2 minutes.<br />No commitment required.
          </p>
        </div>

        {/* Feature row */}
        <div style={{ display: 'flex', gap: 16, marginTop: 24 }}>
          {[
            { icon: '⚡', val: '2 min', desc: 'Eligibility' },
            { icon: '✦', val: '₹75K',  desc: 'Credit limit' },
            { icon: '🔒', val: '0',     desc: 'Hidden fees' },
          ].map(f => (
            <div key={f.desc} style={{ flex: 1 }}>
              <div aria-hidden="true" style={{ fontSize: 17, marginBottom: 2 }}>{f.icon}</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: 'white', lineHeight: 1 }}>{f.val}</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', marginTop: 2 }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA sheet */}
      <div style={{ background: CZ.card, borderRadius: '28px 28px 0 0', padding: '20px 24px 0', boxShadow: '0 -8px 40px rgba(9,22,64,0.28)', flexShrink: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
          <div style={{ width: 40, height: 4, borderRadius: 2, background: CZ.border }} />
        </div>

        <Button label="Check my eligibility →" onClick={() => navigate(SCREENS.SIGN_UP)} />

        <div style={{ textAlign: 'center', marginTop: 10 }}>
          <span style={{ fontSize: 12.5, color: CZ.muted }}>Soft check only — your credit score is </span>
          <span style={{ fontSize: 12.5, color: CZ.success, fontWeight: 600 }}>not affected</span>
        </div>

        <div style={{ marginTop: 10 }}>
          <AIBubble message="Hi, I'm here if you need help at any step." style={{ margin: 0 }} />
        </div>

        <div style={{ textAlign: 'center', padding: '12px 0 4px', fontSize: 10.5, color: CZ.muted, lineHeight: 1.5 }}>
          [RBI Reg. No.] · [NBFC Partner] · Fair Practices Code Compliant
        </div>

        <div style={{ textAlign: 'center', paddingBottom: 8 }}>
          <button
            type="button"
            className="pressable"
            onClick={() => navigate(SCREENS.SIGN_IN)}
            style={{ fontSize: 14, color: CZ.navyMid, fontWeight: 600, cursor: 'pointer', background: 'none', border: 'none', padding: 0 }}
          >
            Already have an account? Sign in →
          </button>
        </div>

        <HomeIndicator />
      </div>
    </Screen>
  );
}
