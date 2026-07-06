import { CZ } from '../../tokens';
import { Screen, StatusBar, HomeIndicator, NavBar, Card, AICard, Button } from '../../components';
import { useNav, SCREENS } from '../../navigation/NavigationContext';

export default function PartialEligibilityScreen() {
  const { navigate, goBack } = useNav();
  return (
    <Screen className="screen-enter">
      <StatusBar />
      <NavBar step={3} total={3} onBack={goBack} />

      <div className="scroll-hidden" style={{ flex: 1, overflowY: 'auto' }}>
        {/* Info header */}
        <div style={{ textAlign: 'center', padding: '8px 28px 16px', flexShrink: 0 }}>
          <div style={{
            width: 60, height: 60, borderRadius: '50%',
            background: CZ.navyLight, border: `2px solid ${CZ.navyBorder}`,
            margin: '0 auto 14px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: `0 0 0 8px ${CZ.subtle}`,
            animation: 'czSuccessPop 0.5s ease',
          }}>
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <circle cx="14" cy="14" r="11" stroke={CZ.navyMid} strokeWidth="1.8" />
              <path d="M14 9v5.5" stroke={CZ.navyMid} strokeWidth="2" strokeLinecap="round" />
              <circle cx="14" cy="19.5" r="1.2" fill={CZ.navyMid} />
            </svg>
          </div>
          <h2 style={{ fontSize: 24, fontWeight: 800, color: CZ.navy, lineHeight: 1.2, margin: '0 0 10px', letterSpacing: -0.4 }}>
            Your credit line is ready — at a lower amount.
          </h2>
          <p style={{ fontSize: 14, color: CZ.textMd, lineHeight: 1.6, margin: 0 }}>
            Based on your profile today, we can offer ₹8,000 instead of the full ₹35,000.
          </p>
        </div>

        {/* Offer card */}
        <div style={{ margin: '0 20px 12px' }}>
          <Card style={{ padding: '18px' }}>
            <div style={{ textAlign: 'center', marginBottom: 14 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: CZ.muted, letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: 6 }}>Available now</div>
              <div style={{ fontSize: 52, fontWeight: 800, color: CZ.navy, lineHeight: 1, letterSpacing: -1 }}>₹8,000</div>
            </div>
            <div style={{ background: CZ.subtle, borderRadius: 10, padding: '10px 12px', marginBottom: 14, border: `1px solid ${CZ.border}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ fontSize: 13, color: CZ.textMd }}>If you draw ₹8,000</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: CZ.text }}>Repay ₹8,120</span>
              </div>
              <div style={{ fontSize: 12, color: CZ.muted }}>₹120 interest · ₹0 processing fee</div>
            </div>
            <Button label="Accept ₹8,000 →" onClick={() => navigate(SCREENS.DASHBOARD)} />
            <div style={{ textAlign: 'center', marginTop: 12 }}>
              <span
                className="pressable"
                onClick={goBack}
                style={{ fontSize: 14, color: CZ.textMd, cursor: 'pointer' }}
              >
                No thanks, I'll come back later →
              </span>
            </div>
          </Card>
        </div>

        <AICard
          message="Your limit will grow as you build repayment history with CredZo. Many users reach ₹50,000+ within 6 months."
          style={{ marginBottom: 10 }}
        />

        {/* What helps */}
        <div style={{ margin: '0 20px 12px' }}>
          <Card style={{ padding: '14px 16px' }}>
            <div style={{ fontSize: 13.5, fontWeight: 700, color: CZ.text, marginBottom: 10 }}>What improves your limit:</div>
            {[
              'Consistent repayment history with CredZo',
              'Reducing existing credit balances',
              'Stable income signals over time',
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: i < 2 ? 8 : 0 }}>
                <div style={{
                  width: 18, height: 18, borderRadius: '50%',
                  background: CZ.tealSurface, border: `1px solid ${CZ.tealBorder}`,
                  flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 1,
                }}>
                  <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                    <path d="M1.5 4.5L3.5 6.5L7.5 2.5" stroke={CZ.teal} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span style={{ fontSize: 13, color: CZ.textMd, lineHeight: 1.5 }}>{item}</span>
              </div>
            ))}
          </Card>
        </div>
      </div>
      <HomeIndicator />
    </Screen>
  );
}
