import { CZ } from '../../tokens';
import { Screen, StatusBar, HomeIndicator, NavBar, Card, AICard } from '../../components';
import { useNav, SCREENS } from '../../navigation/NavigationContext';

const NEXT_STEPS = [
  { icon: '📊', label: 'Check your free credit score' },
  { icon: '📅', label: 'Try again in 30 days' },
  { icon: '💬', label: 'Talk to our team' },
];

export default function FullRejectionScreen() {
  const { navigate, goBack } = useNav();
  return (
    <Screen className="screen-enter">
      <StatusBar />
      <NavBar step={3} total={3} onBack={goBack} />

      <div className="scroll-hidden" style={{ flex: 1, overflowY: 'auto' }}>
        {/* Empathetic header */}
        <div style={{ textAlign: 'center', padding: '8px 28px 16px' }}>
          <div style={{
            width: 80, height: 80, margin: '0 auto 14px',
            borderRadius: 20, background: CZ.subtle,
            border: `1.5px dashed ${CZ.border}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            animation: 'czSlideUp 0.4s ease',
          }}>
            {/* Calm illustration placeholder */}
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <circle cx="20" cy="20" r="16" stroke={CZ.border} strokeWidth="2" />
              <path d="M14 24c1.5-2 10.5-2 12 0" stroke={CZ.muted} strokeWidth="1.8" strokeLinecap="round" />
              <circle cx="15" cy="17" r="2" fill={CZ.muted} />
              <circle cx="25" cy="17" r="2" fill={CZ.muted} />
            </svg>
          </div>
          <h2 style={{ fontSize: 24, fontWeight: 800, color: CZ.navy, lineHeight: 1.2, margin: '0 0 10px', letterSpacing: -0.4 }}>
            Not quite yet — but here's your path.
          </h2>
          <p style={{ fontSize: 14, color: CZ.textMd, lineHeight: 1.6, margin: 0 }}>
            We couldn't approve a credit line today based on your current profile. Here's what you can do.
          </p>
        </div>

        {/* Reason card */}
        <div style={{ margin: '0 20px 10px' }}>
          <Card style={{ padding: '14px 16px' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: CZ.muted, textTransform: 'uppercase', letterSpacing: 0.6, marginBottom: 8 }}>Why this happened</div>
            <p style={{ fontSize: 13.5, color: CZ.text, lineHeight: 1.6, margin: 0 }}>
              Your credit score didn't meet our minimum threshold this time. This is not permanent — many factors can be improved.
            </p>
          </Card>
        </div>

        {/* Next steps */}
        <div style={{ margin: '0 20px 10px' }}>
          <Card style={{ overflow: 'hidden', padding: 0 }}>
            <div style={{ padding: '10px 16px', borderBottom: `1px solid ${CZ.border}`, background: CZ.subtle }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: CZ.text }}>Next steps</span>
            </div>
            {NEXT_STEPS.map((s, i) => (
              <div
                key={i}
                className="pressable"
                style={{
                  display: 'flex', alignItems: 'center',
                  padding: '14px 16px',
                  borderBottom: i < NEXT_STEPS.length - 1 ? `1px solid ${CZ.border}` : 'none',
                  cursor: 'pointer',
                }}
              >
                <div style={{
                  width: 36, height: 36, borderRadius: 10,
                  background: CZ.navyLight, border: `1px solid ${CZ.navyBorder}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 18, marginRight: 12, flexShrink: 0,
                }}>
                  {s.icon}
                </div>
                <span style={{ fontSize: 14, color: CZ.navyMid, fontWeight: 600, flex: 1 }}>{s.label}</span>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M7 5l4 4-4 4" stroke={CZ.muted} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            ))}
          </Card>
        </div>

        <AICard
          message="This is not a reflection of your financial worth. Credit scores can be improved, and we'd love to help you get there."
          style={{ marginBottom: 12 }}
        />
      </div>

      <HomeIndicator />
    </Screen>
  );
}
