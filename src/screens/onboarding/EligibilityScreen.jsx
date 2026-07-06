import { CZ } from '../../tokens';
import { Screen, StatusBar, HomeIndicator, NavBar, Stepper, AICard, Button, TrustPill } from '../../components';
import { useNav, SCREENS } from '../../navigation/NavigationContext';

export default function EligibilityScreen() {
  const { navigate, goBack } = useNav();
  return (
    <Screen className="screen-enter">
      <StatusBar />
      <NavBar step={1} total={3} onBack={goBack} onHelp={() => navigate(SCREENS.AI_HELP, { overlay: true })} />
      <Stepper active={1} />

      <AICard
        message="Based on your mobile profile, here's what you may qualify for. Complete verification to confirm your exact limit."
        style={{ marginBottom: 14 }}
      />

      {/* Credit range hero */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '0 28px' }}>
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
          <div style={{
            position: 'absolute', width: 200, height: 200, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(26,75,158,0.07) 0%, transparent 70%)',
          }} />
          <div style={{ textAlign: 'center', position: 'relative' }}>
            <div style={{ fontSize: 11.5, fontWeight: 700, color: CZ.muted, letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 10 }}>
              You may qualify for
            </div>
            <div style={{ fontSize: 50, fontWeight: 800, color: CZ.navy, lineHeight: 1, letterSpacing: -1 }}>₹20,000</div>
            <div style={{ fontSize: 26, fontWeight: 700, color: CZ.muted, margin: '4px 0', lineHeight: 1 }}>to</div>
            <div style={{ fontSize: 50, fontWeight: 800, color: CZ.navy, lineHeight: 1, letterSpacing: -1 }}>₹75,000</div>
          </div>
        </div>

        <p style={{ fontSize: 14, color: CZ.textMd, textAlign: 'center', lineHeight: 1.6, margin: '0 0 20px', maxWidth: 280 }}>
          Exact amount confirmed after a quick identity check — takes less than 2 minutes.
        </p>

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
          {[
            { text: 'No hidden fees' },
            { text: 'No commitment yet' },
            { text: '2-min verification' },
          ].map(t => (
            <TrustPill key={t.text} variant="success">✓ {t.text}</TrustPill>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{ padding: '0 24px 12px', flexShrink: 0 }}>
        <Button label="See my exact limit →" onClick={() => navigate(SCREENS.AADHAAR_OTP)} />
        <div style={{ textAlign: 'center', marginTop: 12 }}>
          <span style={{ fontSize: 13.5, color: CZ.navyMid, fontWeight: 600, cursor: 'pointer' }}>
            How is this calculated? →
          </span>
        </div>
        <HomeIndicator />
      </div>
    </Screen>
  );
}
