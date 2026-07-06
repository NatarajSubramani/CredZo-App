import { useState } from 'react';
import { CZ } from '../../tokens';
import { Screen, StatusBar, Logo, Card, TabBar } from '../../components';
import { useNav, SCREENS } from '../../navigation/NavigationContext';

const TIMELINE = [
  { date: '31', month: 'Mar', amount: '₹10,150', paid: true },
  { date: '30', month: 'Apr', amount: '₹10,150', paid: true },
  { date: '31', month: 'May', amount: '₹10,150', current: true },
  { date: '30', month: 'Jun', amount: '—',        future: true },
  { date: '31', month: 'Jul', amount: '—',        future: true },
];

const TRANSACTIONS = [
  { label: 'Credit drawn',       date: '11 May',  amount: '+₹10,000', type: 'credit' },
  { label: 'Repayment - April',  date: '30 Apr',  amount: '-₹10,150', type: 'debit' },
  { label: 'Credit drawn',       date: '01 Apr',  amount: '+₹10,000', type: 'credit' },
];

export default function RepaymentDashboard() {
  const { navigate } = useNav();
  const [tab, setTab]           = useState(0);
  const [nudgeDismissed, setND] = useState(false);
  const [paying, setPaying]     = useState(false);

  const handlePay = () => {
    setPaying(true);
    setTimeout(() => {
      setPaying(false);
      // Show success state inline
    }, 1600);
  };

  return (
    <Screen className="screen-enter">
      <StatusBar />

      {/* Header bar */}
      <div style={{ padding: '0 20px 4px', flexShrink: 0, display: 'flex', alignItems: 'center' }}>
        <Logo size="sm" />
        <div style={{ flex: 1 }} />
        {/* Bell */}
        <div className="pressable" style={{
          width: 36, height: 36, borderRadius: '50%',
          background: CZ.subtle, border: `1px solid ${CZ.border}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginRight: 10, cursor: 'pointer',
        }}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M9 1.5C6 1.5 4 4 4 7v3L2 12h14l-2-2V7c0-3-2-5.5-5-5.5z" stroke={CZ.textMd} strokeWidth="1.4" />
            <path d="M7.5 14.5c.3.9 1.7.9 2 0" stroke={CZ.textMd} strokeWidth="1.4" strokeLinecap="round" />
            <circle cx="13" cy="4" r="2.5" fill={CZ.error} />
          </svg>
        </div>
        {/* Avatar */}
        <div style={{
          width: 36, height: 36, borderRadius: '50%',
          background: `linear-gradient(135deg, ${CZ.teal}, ${CZ.navyMid})`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 14, fontWeight: 800, color: 'white',
          border: '2px solid white', boxShadow: '0 2px 8px rgba(12,30,72,0.2)',
        }}>A</div>
      </div>

      {/* Greeting */}
      <div style={{ padding: '4px 20px 12px', flexShrink: 0 }}>
        <div style={{ fontSize: 22, fontWeight: 800, color: CZ.text, letterSpacing: -0.4 }}>Good morning, Arun 👋</div>
        <div style={{ fontSize: 13, color: CZ.muted, marginTop: 2 }}>Your credit line is in good shape.</div>
      </div>

      <div className="scroll-hidden" style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
        {/* Credit health card */}
        <div style={{ margin: '0 20px 12px', flexShrink: 0 }}>
          <Card style={{ padding: '16px', overflow: 'hidden', position: 'relative' }}>
            <div style={{ position: 'absolute', top: -20, right: -20, width: 120, height: 120, borderRadius: '50%', background: `radial-gradient(circle, ${CZ.navyLight} 0%, transparent 70%)`, pointerEvents: 'none' }} />

            <div style={{ display: 'flex', gap: 0, marginBottom: 14, position: 'relative' }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 11.5, color: CZ.muted, marginBottom: 4 }}>Credit available</div>
                <div style={{ fontSize: 30, fontWeight: 800, color: CZ.navy, lineHeight: 1, letterSpacing: -0.5 }}>₹25,000</div>
              </div>
              <div style={{ width: 1, background: CZ.border, margin: '0 16px' }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 11.5, color: CZ.muted, marginBottom: 4 }}>Outstanding</div>
                <div style={{ fontSize: 30, fontWeight: 800, color: CZ.warning, lineHeight: 1, letterSpacing: -0.5 }}>₹10,000</div>
              </div>
            </div>

            {/* Utilisation bar */}
            <div style={{ height: 7, background: CZ.border, borderRadius: 4, overflow: 'hidden', marginBottom: 5 }}>
              <div style={{ height: '100%', width: '29%', background: `linear-gradient(90deg, ${CZ.teal}, ${CZ.navyMid})`, borderRadius: 4, transition: 'width 0.8s cubic-bezier(0.4,0,0.2,1)' }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 11.5, color: CZ.muted }}>29% utilised</span>
              <span style={{ fontSize: 11.5, color: CZ.muted }}>Limit: ₹35,000</span>
            </div>

            {/* Quick actions */}
            <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
              {[
                { label: 'Draw',    icon: '↓', primary: true,  action: () => navigate(SCREENS.CREDIT_DRAW) },
                { label: 'Pay',     icon: '↑', primary: false, action: handlePay },
                { label: 'History', icon: '≡', primary: false, action: () => {} },
              ].map(a => (
                <div
                  key={a.label}
                  className="pressable"
                  onClick={a.action}
                  style={{
                    flex: 1, height: 40, borderRadius: 20,
                    background: a.primary ? CZ.navy : CZ.subtle,
                    border: `1px solid ${a.primary ? CZ.navy : CZ.border}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5,
                    cursor: 'pointer',
                  }}
                >
                  <span style={{ fontSize: 14, color: a.primary ? 'white' : CZ.navyMid }}>{a.icon}</span>
                  <span style={{ fontSize: 12.5, fontWeight: 600, color: a.primary ? 'white' : CZ.textMd }}>{a.label}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Repayment plan */}
        <div style={{ padding: '0 20px 8px', flexShrink: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 14.5, fontWeight: 700, color: CZ.text }}>Repayment plan</span>
          <span style={{ fontSize: 12.5, color: CZ.navyMid, fontWeight: 600, cursor: 'pointer' }}>View all →</span>
        </div>

        {/* Timeline strip */}
        <div style={{ padding: '0 20px 10px', flexShrink: 0 }}>
          <div className="scroll-hidden" style={{ display: 'flex', gap: 7, overflowX: 'auto' }}>
            {TIMELINE.map((d, i) => (
              <div key={i} style={{
                flexShrink: 0,
                width: d.current ? 68 : 56,
                padding: '10px 6px',
                background: d.paid ? CZ.successBg : d.current ? CZ.navy : CZ.card,
                border: `1.5px solid ${d.paid ? CZ.successBdr : d.current ? CZ.navy : CZ.border}`,
                borderRadius: 14, textAlign: 'center',
                boxShadow: d.current ? '0 4px 16px rgba(12,30,72,0.2)' : CZ.shadowSm,
                transition: 'all 0.3s ease',
              }}>
                <div style={{ fontSize: d.current ? 20 : 16, fontWeight: 800, color: d.paid ? CZ.success : d.current ? 'white' : CZ.muted, lineHeight: 1 }}>
                  {d.paid ? '✓' : d.date}
                </div>
                <div style={{ fontSize: 10, color: d.current ? 'rgba(255,255,255,0.65)' : CZ.muted, marginTop: 2 }}>{d.month}</div>
                <div style={{ fontSize: 9.5, color: d.current ? 'rgba(255,255,255,0.85)' : CZ.muted, marginTop: 1, fontWeight: d.current ? 600 : 400 }}>{d.amount}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Due card */}
        <div style={{ margin: '0 20px 10px', flexShrink: 0 }}>
          <Card style={{ padding: '14px 16px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 10 }}>
              <div>
                <div style={{ fontSize: 19, fontWeight: 800, color: CZ.text, letterSpacing: -0.3 }}>₹10,150 due</div>
                <div style={{ fontSize: 13, color: CZ.textMd, marginTop: 2 }}>31 May 2026</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5, background: CZ.successBg, border: `1px solid ${CZ.successBdr}`, borderRadius: 20, padding: '4px 10px', flexShrink: 0 }}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2.5 6L5 8.5L9.5 4" stroke={CZ.success} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span style={{ fontSize: 11.5, fontWeight: 700, color: CZ.success }}>3 on-time</span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <div style={{ flex: 2 }}>
                <button
                  className="pressable"
                  onClick={handlePay}
                  style={{
                    width: '100%', height: 48, borderRadius: 24,
                    background: paying ? CZ.success : CZ.navy,
                    color: 'white', border: 'none', fontSize: 14, fontWeight: 700,
                    fontFamily: CZ.font, cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                    transition: 'background 0.3s ease',
                    boxShadow: CZ.shadowBtn,
                  }}
                >
                  {paying ? (
                    <>
                      <div style={{ width: 16, height: 16, borderRadius: '50%', border: '2px solid white', borderTopColor: 'transparent', animation: 'czSpin 0.8s linear infinite' }} />
                      Processing…
                    </>
                  ) : 'Pay now'}
                </button>
              </div>
              <div
                className="pressable"
                style={{
                  flex: 1, height: 48, borderRadius: 24,
                  border: `1.5px solid ${CZ.navy}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer',
                }}
              >
                <span style={{ fontSize: 13.5, fontWeight: 700, color: CZ.navy }}>Pay early</span>
              </div>
            </div>
          </Card>
        </div>

        {/* AI nudge */}
        {!nudgeDismissed && (
          <div style={{ padding: '0 20px 10px', flexShrink: 0 }}>
            <div style={{
              background: CZ.tealSurface, borderRadius: 14,
              border: `1px solid ${CZ.tealBorder}`,
              padding: '10px 14px',
              display: 'flex', alignItems: 'flex-start', gap: 10,
              animation: 'czSlideUp 0.3s ease',
            }}>
              <div style={{ width: 24, height: 24, borderRadius: '50%', background: CZ.aiGrad, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M5 1L6.2 4H9.5L6.9 5.8L7.9 9L5 7.2L2.1 9L3.1 5.8L.5 4H3.8L5 1Z" fill="white" />
                </svg>
              </div>
              <span style={{ fontSize: 12.5, color: '#0C3540', lineHeight: 1.5, flex: 1 }}>
                You're on track, Arun. Paying by Friday keeps your credit score healthy. 🌱
              </span>
              <div
                className="pressable"
                onClick={() => setND(true)}
                style={{ cursor: 'pointer', color: CZ.muted, fontSize: 16, flexShrink: 0, marginTop: -2, lineHeight: 1 }}
              >
                ×
              </div>
            </div>
          </div>
        )}

        {/* Recent transactions */}
        <div style={{ padding: '0 20px 8px', flexShrink: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 14.5, fontWeight: 700, color: CZ.text }}>Recent activity</span>
          <span style={{ fontSize: 12.5, color: CZ.navyMid, fontWeight: 600, cursor: 'pointer' }}>See all →</span>
        </div>
        <div style={{ margin: '0 20px 12px', flexShrink: 0 }}>
          <Card style={{ overflow: 'hidden', padding: 0 }}>
            {TRANSACTIONS.map((tx, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', padding: '12px 16px',
                borderBottom: i < TRANSACTIONS.length - 1 ? `1px solid ${CZ.border}` : 'none',
              }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 10,
                  background: tx.type === 'credit' ? CZ.successBg : CZ.subtle,
                  border: `1px solid ${tx.type === 'credit' ? CZ.successBdr : CZ.border}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginRight: 12, flexShrink: 0,
                }}>
                  <span style={{ fontSize: 16 }}>{tx.type === 'credit' ? '↓' : '↑'}</span>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13.5, fontWeight: 600, color: CZ.text }}>{tx.label}</div>
                  <div style={{ fontSize: 12, color: CZ.muted, marginTop: 1 }}>{tx.date}</div>
                </div>
                <div style={{ fontSize: 14, fontWeight: 700, color: tx.type === 'credit' ? CZ.success : CZ.text }}>
                  {tx.amount}
                </div>
              </div>
            ))}
          </Card>
        </div>
      </div>

      <TabBar active={tab} onTab={setTab} />
    </Screen>
  );
}
