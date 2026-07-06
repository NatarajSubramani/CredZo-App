import { useState, useEffect } from 'react';
import { CZ } from '../../tokens';
import { Screen, StatusBar, HomeIndicator, NavBar, Stepper, AICard, OTPBoxes, Button } from '../../components';
import { useNav, SCREENS } from '../../navigation/NavigationContext';

export default function AadhaarOTPScreen() {
  const { navigate, goBack } = useNav();
  const [otp, setOtp]             = useState('');
  const [countdown, setCountdown] = useState(45);
  const [autoFill, setAutoFill]   = useState(false);

  // Countdown timer
  useEffect(() => {
    if (countdown <= 0) return;
    const id = setTimeout(() => setCountdown(c => c - 1), 1000);
    return () => clearTimeout(id);
  }, [countdown]);

  // Simulate auto-fill after 3 seconds
  useEffect(() => {
    const id = setTimeout(() => {
      setAutoFill(true);
      let filled = '';
      const digits = ['8', '3', '1', '6', '4', '2'];
      const fill = (i) => {
        if (i >= 6) return;
        setTimeout(() => {
          filled += digits[i];
          setOtp(filled);
          fill(i + 1);
        }, 140);
      };
      fill(0);
    }, 3000);
    return () => clearTimeout(id);
  }, []);

  const canSubmit = otp.length === 6;

  const handleConfirm = () => {
    navigate(SCREENS.PAN_CAPTURE);
  };

  return (
    <Screen className="screen-enter">
      <StatusBar />
      <NavBar step={2} total={3} onBack={goBack} onHelp={() => navigate(SCREENS.AI_HELP, { overlay: true })} />
      <Stepper active={2} />

      <AICard
        message="I've requested a 6-digit OTP from UIDAI — the government body managing Aadhaar. It will arrive on your registered mobile in about 30 seconds."
        link="What is UIDAI?"
        style={{ marginBottom: 16 }}
      />

      {/* Phone chip */}
      <div style={{ padding: '0 20px 12px', flexShrink: 0 }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: CZ.subtle, borderRadius: 24, padding: '8px 16px',
          border: `1px solid ${CZ.border}`, boxShadow: CZ.shadowSm,
        }}>
          <div style={{
            width: 28, height: 28, borderRadius: '50%',
            background: CZ.navyLight, border: `1px solid ${CZ.navyBorder}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M4 1h6a1 1 0 011 1v10a1 1 0 01-1 1H4a1 1 0 01-1-1V2a1 1 0 011-1z" stroke={CZ.navyMid} strokeWidth="1.2" />
              <circle cx="7" cy="11.2" r=".8" fill={CZ.navyMid} />
            </svg>
          </div>
          <div>
            <div style={{ fontSize: 11, color: CZ.muted, fontWeight: 500 }}>OTP sent to</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: CZ.text }}>+91 98XXX XXXXX</div>
          </div>
          <div style={{ marginLeft: 4, width: 28, height: 28, borderRadius: '50%', background: CZ.navyLight, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2.5 11.5L9 5l1.5 1.5-6.5 6.5H2.5v-1.5zm8-8L9 2l1.5-1.5 1.5 1.5L10.5 3.5z" stroke={CZ.navyMid} strokeWidth="1.2" strokeLinecap="round" />
            </svg>
          </div>
        </div>
      </div>

      {/* OTP boxes */}
      <div style={{ padding: '0 20px 8px', flexShrink: 0 }}>
        <OTPBoxes value={otp} onChange={setOtp} total={6} />
      </div>

      {/* Auto-detect badge */}
      {autoFill && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4px 20px 4px', flexShrink: 0 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            background: CZ.tealSurface, border: `1px solid ${CZ.tealBorder}`,
            borderRadius: 20, padding: '5px 12px',
          }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: CZ.teal, animation: 'czPulse 1.8s ease-in-out infinite' }} />
            <span style={{ fontSize: 12.5, color: CZ.teal, fontWeight: 600 }}>
              {otp.length < 6 ? 'Auto-detecting OTP…' : 'OTP detected ✓'}
            </span>
          </div>
        </div>
      )}

      {/* Timer */}
      <div style={{ textAlign: 'center', padding: '8px 20px', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5, marginBottom: 4 }}>
          <svg aria-hidden="true" width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 1.5C3.96 1.5 1.5 3.96 1.5 7S3.96 12.5 7 12.5 12.5 10.04 12.5 7 10.04 1.5 7 1.5zm0 2v3.8L9.2 9" stroke={CZ.muted} strokeWidth="1.3" strokeLinecap="round" />
          </svg>
          {countdown > 0 ? (
            <span aria-live="polite" aria-atomic="true" style={{ fontSize: 13, color: CZ.muted }}>
              Resend OTP in <strong style={{ color: CZ.navy }}>0:{countdown.toString().padStart(2, '0')}</strong>
            </span>
          ) : (
            <button
              type="button"
              className="pressable"
              onClick={() => setCountdown(45)}
              style={{ fontSize: 13, color: CZ.navyMid, fontWeight: 700, cursor: 'pointer', background: 'none', border: 'none', padding: 0 }}
            >
              Resend OTP →
            </button>
          )}
        </div>
        <div style={{ fontSize: 12, color: CZ.success, fontWeight: 500 }}>🔒 End-to-end encrypted · UIDAI verified</div>
      </div>

      <div style={{ flex: 1 }} />

      {/* CTA */}
      <div style={{ padding: '0 24px 12px', flexShrink: 0 }}>
        <Button
          label="Confirm my Aadhaar"
          disabled={!canSubmit}
          onClick={handleConfirm}
        />
        <div style={{ textAlign: 'center', marginTop: 12 }}>
          <button
            type="button"
            className="pressable"
            onClick={() => navigate(SCREENS.AI_HELP, { overlay: true })}
            style={{ fontSize: 13.5, color: CZ.navyMid, fontWeight: 600, cursor: 'pointer', background: 'none', border: 'none', padding: 0 }}
          >
            Not receiving OTP? I can help →
          </button>
        </div>
        <HomeIndicator />
      </div>
    </Screen>
  );
}
