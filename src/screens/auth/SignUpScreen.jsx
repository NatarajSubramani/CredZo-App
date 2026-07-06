import { useState } from 'react';
import { CZ } from '../../tokens';
import {
  Screen, StatusBar, HomeIndicator, Logo,
  Input, Button, TrustPill,
} from '../../components';
import { useNav, SCREENS } from '../../navigation/NavigationContext';

export default function SignUpScreen() {
  const { navigate, goBack } = useNav();
  const [name, setName]       = useState('');
  const [phone, setPhone]     = useState('');
  const [email, setEmail]     = useState('');
  const [agreed, setAgreed]   = useState(false);
  const [loading, setLoading] = useState(false);

  const isValid = name.trim() && phone.length >= 10 && agreed;

  const handleSendOTP = () => {
    if (!isValid) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate(SCREENS.OTP_VERIFY);
    }, 1200);
  };

  return (
    <Screen bg={CZ.heroGrad} className="screen-enter">
      <StatusBar dark />

      {/* Dark top */}
      <div style={{ padding: '4px 24px 28px', flexShrink: 0, position: 'relative', overflow: 'hidden' }}>
        <svg style={{ position: 'absolute', inset: 0, opacity: 0.04, pointerEvents: 'none' }} width="390" height="200">
          {Array.from({ length: 8 }).map((_, row) =>
            Array.from({ length: 14 }).map((_, col) => (
              <circle key={`${row}-${col}`} cx={col * 30 + 15} cy={row * 24 + 12} r="1.8" fill="white" />
            ))
          )}
        </svg>
        <div style={{
          position: 'absolute', top: -80, left: -40, width: 260, height: 260, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(14,165,201,0.12) 0%, transparent 65%)', pointerEvents: 'none',
        }} />

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
          <div
            className="pressable"
            onClick={goBack}
            style={{
              width: 40, height: 40, borderRadius: '50%',
              background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
            }}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M11.5 4.5L7 9L11.5 13.5" stroke="rgba(255,255,255,0.85)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <Logo dark size="sm" />
        </div>

        <h1 style={{ fontSize: 28, fontWeight: 800, color: 'white', margin: '0 0 8px', letterSpacing: -0.5, lineHeight: 1.2 }}>
          Create your account.
        </h1>
        <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', margin: '0 0 12px', lineHeight: 1.5 }}>
          Join 2 lakh+ users who access credit in minutes.
        </p>

        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 7,
          background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.18)',
          borderRadius: 24, padding: '6px 14px',
        }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 1.5L8.7 5.5H13L9.6 7.9L10.8 12L7 9.6L3.2 12L4.4 7.9L1 5.5H5.3L7 1.5Z" fill="rgba(255,255,255,0.75)" />
          </svg>
          <span style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.8)', fontWeight: 600 }}>
            Check limit · ₹20,000–₹75,000 · No commitment
          </span>
        </div>
      </div>

      {/* Form sheet */}
      <div style={{
        flex: 1, background: CZ.card,
        borderRadius: '28px 28px 0 0',
        boxShadow: '0 -8px 40px rgba(9,22,64,0.28)',
        display: 'flex', flexDirection: 'column',
        overflow: 'hidden',
      }}>
        <div style={{ display: 'flex', justifyContent: 'center', padding: '12px 0 4px' }}>
          <div style={{ width: 40, height: 4, borderRadius: 2, background: CZ.border }} />
        </div>

        <div className="scroll-hidden" style={{ flex: 1, padding: '8px 24px 0', display: 'flex', flexDirection: 'column', gap: 14, overflowY: 'auto' }}>
          {/* Step dots */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ display: 'flex', gap: 5 }}>
              {[1, 2].map(n => (
                <div key={n} style={{
                  width: n === 1 ? 24 : 8, height: 6, borderRadius: 3,
                  background: n === 1 ? CZ.navy : CZ.border,
                  transition: 'width 0.3s',
                }} />
              ))}
            </div>
            <span style={{ fontSize: 12, color: CZ.muted, fontWeight: 500 }}>Step 1 of 2 — Basic info</span>
          </div>

          <div style={{ fontSize: 20, fontWeight: 800, color: CZ.text, letterSpacing: -0.4 }}>
            Let's get started
          </div>

          <Input label="Full name" placeholder="Arun Sharma" value={name} onChange={setName} />
          <Input
            label="Mobile number"
            placeholder="98765 43210"
            prefix="+91"
            value={phone}
            onChange={setPhone}
            type="tel"
            hint="We'll send an OTP to verify this number"
          />
          <Input
            label="Email address"
            placeholder="arun@example.com"
            value={email}
            onChange={setEmail}
            type="email"
            hint="Optional — for statements & alerts"
          />

          {/* Terms */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
            <div
              className="pressable"
              onClick={() => setAgreed(v => !v)}
              style={{
                width: 20, height: 20, borderRadius: 5, flexShrink: 0, marginTop: 1,
                background: agreed ? CZ.navy : 'white',
                border: `2px solid ${agreed ? CZ.navy : CZ.border}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', transition: 'all 0.2s ease',
              }}
            >
              {agreed && (
                <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                  <path d="M2 5.5L4.5 8L9 3" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>
            <p style={{ fontSize: 12.5, color: CZ.textMd, lineHeight: 1.55, margin: 0 }}>
              I agree to the{' '}
              <span style={{ color: CZ.navyMid, fontWeight: 600, cursor: 'pointer' }}>Terms of Service</span>
              {' '}and{' '}
              <span style={{ color: CZ.navyMid, fontWeight: 600, cursor: 'pointer' }}>Privacy Policy</span>.
              I consent to my data being processed for credit assessment.
            </p>
          </div>

          <Button label="Send OTP →" disabled={!isValid} loading={loading} onClick={handleSendOTP} />

          <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap', paddingBottom: 4 }}>
            {['🔒 Data encrypted', '✦ Soft check only', '⚡ 2-min process'].map(t => (
              <TrustPill key={t}>{t}</TrustPill>
            ))}
          </div>
        </div>

        <div style={{ padding: '8px 24px 4px', textAlign: 'center' }}>
          <span style={{ fontSize: 14, color: CZ.muted }}>Already a member? </span>
          <span
            className="pressable"
            onClick={() => navigate(SCREENS.SIGN_IN)}
            style={{ fontSize: 14, color: CZ.navyMid, fontWeight: 700, cursor: 'pointer' }}
          >
            Sign in →
          </span>
        </div>
        <div style={{ textAlign: 'center', padding: '0 24px 4px' }}>
          <span style={{ fontSize: 10.5, color: CZ.muted }}>RBI Registered NBFC · [Reg. No.] · Fair Practices Code</span>
        </div>
        <HomeIndicator />
      </div>
    </Screen>
  );
}
