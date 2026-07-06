import { useState } from 'react';
import { CZ } from '../../tokens';
import {
  Screen, StatusBar, HomeIndicator, Logo,
  Input, Button, Divider,
} from '../../components';
import { useNav, SCREENS } from '../../navigation/NavigationContext';

export default function SignInScreen() {
  const { navigate } = useNav();
  const [phone, setPhone]       = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading]   = useState(false);

  const isValid = phone.length >= 10 && password.length >= 4;

  const handleSignIn = () => {
    if (!isValid) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate(SCREENS.DASHBOARD);
    }, 1400);
  };

  return (
    <Screen bg={CZ.heroGrad} className="screen-enter">
      <StatusBar dark />

      {/* Dark hero */}
      <div style={{ padding: '8px 28px 36px', flexShrink: 0, position: 'relative', overflow: 'hidden' }}>
        {/* Dot matrix — decorative */}
        <svg aria-hidden="true" style={{ position: 'absolute', inset: 0, opacity: 0.045, pointerEvents: 'none' }} width="390" height="200">
          {Array.from({ length: 10 }).map((_, row) =>
            Array.from({ length: 14 }).map((_, col) => (
              <circle key={`${row}-${col}`} cx={col * 30 + 15} cy={row * 22 + 11} r="1.8" fill="white" />
            ))
          )}
        </svg>
        {/* Glow */}
        <div style={{
          position: 'absolute', top: -60, right: -60,
          width: 220, height: 220, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(14,165,201,0.18) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <Logo dark size="md" />

        <div style={{ marginTop: 36 }}>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: 'white', margin: '0 0 8px', letterSpacing: -0.7, lineHeight: 1.15 }}>
            Welcome back.
          </h1>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.55)', margin: 0, lineHeight: 1.55 }}>
            Sign in to access your credit line.
          </p>
        </div>
      </div>

      {/* White sheet */}
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
          <div style={{ fontSize: 20, fontWeight: 800, color: CZ.text, letterSpacing: -0.4, marginBottom: 2 }}>
            Sign in to CredZo
          </div>

          <Input
            label="Mobile number"
            placeholder="98765 43210"
            prefix="+91"
            value={phone}
            onChange={setPhone}
            type="tel"
            autoComplete="tel"
          />

          <div>
            <Input
              label="Password"
              placeholder="Enter your password"
              type={showPass ? 'text' : 'password'}
              value={password}
              onChange={setPassword}
              autoComplete="current-password"
              suffix={
                <button
                  type="button"
                  aria-label={showPass ? 'Hide password' : 'Show password'}
                  onClick={() => setShowPass(v => !v)}
                  style={{ cursor: 'pointer', background: 'none', border: 'none', padding: 0, display: 'flex', alignItems: 'center' }}
                >
                  <svg aria-hidden="true" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    {showPass ? (
                      <>
                        <path d="M3 3l14 14" stroke={CZ.muted} strokeWidth="1.5" strokeLinecap="round" />
                        <path d="M10 4C5.5 4 2 10 2 10s1.5 2.5 4 4" stroke={CZ.muted} strokeWidth="1.5" strokeLinecap="round" />
                        <path d="M14 6.5c1.5 1 3 3.5 3 3.5s-3.5 6-7 6c-1 0-2-.3-2.8-.7" stroke={CZ.muted} strokeWidth="1.5" strokeLinecap="round" />
                      </>
                    ) : (
                      <>
                        <ellipse cx="10" cy="10" rx="8" ry="5.5" stroke={CZ.muted} strokeWidth="1.5" />
                        <circle cx="10" cy="10" r="2.5" stroke={CZ.muted} strokeWidth="1.5" />
                      </>
                    )}
                  </svg>
                </button>
              }
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 7 }}>
              <button
                type="button"
                style={{ fontSize: 13, color: CZ.navyMid, fontWeight: 600, cursor: 'pointer', background: 'none', border: 'none', padding: 0 }}
              >
                Forgot password?
              </button>
            </div>
          </div>

          <Button label="Sign in →" disabled={!isValid} loading={loading} onClick={handleSignIn} />

          <Divider label="or continue with" />

          {/* Social row */}
          <div style={{ display: 'flex', gap: 10 }}>
            {/* Social sign-in — using button for keyboard + screen reader access */}
            {[
              {
                label: 'Face ID',
                icon: (
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke={CZ.textMd} strokeWidth="1.5" strokeLinecap="round">
                    <rect x="1.5" y="1.5" width="5" height="5" rx="1.5" />
                    <rect x="15.5" y="1.5" width="5" height="5" rx="1.5" />
                    <rect x="1.5" y="15.5" width="5" height="5" rx="1.5" />
                    <rect x="15.5" y="15.5" width="5" height="5" rx="1.5" />
                    <circle cx="8" cy="9" r="1.2" fill={CZ.textMd} stroke="none" />
                    <circle cx="14" cy="9" r="1.2" fill={CZ.textMd} stroke="none" />
                    <path d="M8 14.5c.8 1.2 5.2 1.2 6 0" />
                  </svg>
                ),
              },
              {
                label: 'Google',
                icon: (
                  <svg width="20" height="20" viewBox="0 0 20 20">
                    <path d="M19.6 10.2c0-.7-.1-1.4-.2-2H10v3.8h5.4c-.2 1.5-1.3 2.8-2.8 3.7v2.5h3.3c2-1.8 3.7-4.6 3.7-8z" fill="#4285F4" />
                    <path d="M10 20c3.3 0 6.1-1.1 8.1-2.9l-3.3-2.5c-.9.6-2.1.9-4.8.9-3.2 0-5.9-2.2-6.9-5.1H-.1v2.6C2 17.9 5.7 20 10 20z" fill="#34A853" />
                    <path d="M3.1 11c-.2-.6-.3-1.3-.3-2s.1-1.4.3-2V4.4H-.1C-.9 5.9-1.3 7.4-1.3 9s.4 3.1 1.2 4.6L3.1 11z" fill="#FBBC05" />
                    <path d="M10 3.6c1.8 0 3.4.6 4.6 1.8l3.4-3.4C16.1 1.1 13.3 0 10 0 5.7 0 2 2.1 0 5.4l3.1 2.6C4.1 5.8 6.8 3.6 10 3.6z" fill="#EA4335" />
                  </svg>
                ),
              },
            ].map(({ label, icon }) => (
              <button
                key={label}
                type="button"
                aria-label={`Sign in with ${label}`}
                className="pressable"
                style={{
                  flex: 1, height: 52, borderRadius: 14,
                  border: `1.5px solid ${CZ.border}`,
                  background: CZ.subtle,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  cursor: 'pointer',
                }}
              >
                <span aria-hidden="true">{icon}</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: CZ.textMd }}>{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div style={{ padding: '12px 24px 4px', textAlign: 'center' }}>
          <span style={{ fontSize: 14, color: CZ.muted }}>New to CredZo? </span>
          <button
            type="button"
            className="pressable"
            onClick={() => navigate(SCREENS.SIGN_UP)}
            style={{ fontSize: 14, color: CZ.navyMid, fontWeight: 700, cursor: 'pointer', background: 'none', border: 'none', padding: 0 }}
          >
            Create account →
          </button>
        </div>
        <div style={{ padding: '0 24px 4px', textAlign: 'center' }}>
          <span style={{ fontSize: 10.5, color: CZ.muted, lineHeight: 1.5 }}>
            🔒 256-bit SSL · RBI Registered NBFC · Fair Practices Code Compliant
          </span>
        </div>
        <HomeIndicator />
      </div>
    </Screen>
  );
}
