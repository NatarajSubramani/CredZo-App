import { useState, useEffect } from 'react';
import { CZ } from '../../tokens';
import { Screen, StatusBar, HomeIndicator, NavBar, OTPBoxes, Button } from '../../components';
import { useNav, SCREENS } from '../../navigation/NavigationContext';

export default function OTPVerifyScreen() {
  const { navigate, goBack } = useNav();
  const [otp, setOtp]             = useState('');
  const [countdown, setCountdown] = useState(30);
  const [error, setError]         = useState('');

  useEffect(() => {
    if (countdown <= 0) return;
    const id = setTimeout(() => setCountdown(c => c - 1), 1000);
    return () => clearTimeout(id);
  }, [countdown]);

  const handleVerify = () => {
    if (otp.length < 4) { setError('Please enter the full OTP'); return; }
    navigate(SCREENS.ELIGIBILITY);
  };

  return (
    <Screen className="screen-enter">
      <StatusBar />
      <NavBar onBack={goBack} />

      <div style={{ flex: 1, padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 20 }}>
        {/* Header */}
        <div>
          <div style={{ fontSize: 24, fontWeight: 800, color: CZ.text, letterSpacing: -0.5, marginBottom: 8 }}>
            Verify your number
          </div>
          <p style={{ fontSize: 14, color: CZ.textMd, lineHeight: 1.6, margin: 0 }}>
            We sent a 4-digit OTP to{' '}
            <strong style={{ color: CZ.navy }}>+91 98765 43210</strong>
          </p>
        </div>

        {/* OTP input */}
        <OTPBoxes value={otp} onChange={v => { setOtp(v); setError(''); }} total={4} />

        {error && (
          <div style={{ fontSize: 13, color: CZ.error, textAlign: 'center', fontWeight: 500 }}>{error}</div>
        )}

        {/* Timer */}
        <div style={{ textAlign: 'center' }}>
          {countdown > 0 ? (
            <span style={{ fontSize: 13, color: CZ.muted }}>
              Resend in <strong style={{ color: CZ.navy }}>0:{countdown.toString().padStart(2, '0')}</strong>
            </span>
          ) : (
            <span
              className="pressable"
              onClick={() => setCountdown(30)}
              style={{ fontSize: 13, color: CZ.navyMid, fontWeight: 700, cursor: 'pointer' }}
            >
              Resend OTP →
            </span>
          )}
        </div>

        {/* AI note */}
        <div style={{
          background: CZ.tealSurface, borderRadius: 12, padding: '10px 14px',
          border: `1px solid ${CZ.tealBorder}`, fontSize: 13, color: '#0C3540', lineHeight: 1.5,
        }}>
          ✦ This is a one-time step. Your number is verified once and kept secure.
        </div>

        <div style={{ flex: 1 }} />
        <Button label="Verify & continue →" disabled={otp.length < 4} onClick={handleVerify} />
      </div>
      <HomeIndicator />
    </Screen>
  );
}
