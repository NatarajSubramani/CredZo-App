import { useState } from 'react';
import { CZ } from '../../tokens';
import { Screen, StatusBar, HomeIndicator, NavBar, AICard, Button } from '../../components';
import { useNav, SCREENS } from '../../navigation/NavigationContext';

const ROWS = [
  { label: 'Loan Amount',             value: '₹10,000',                highlight: true },
  { label: 'Interest Rate',           value: '1.5% / month (18% p.a.)' },
  { label: 'Processing Fee',          value: '₹0',                     positive: true },
  { label: 'Repayment Due',           value: '31 May 2026' },
  { label: 'Total Repayment',         value: '₹10,150',                highlight: true },
  { label: 'Late Payment Fee',        value: '₹150 (after 3 days)' },
  { label: 'Prepayment',             value: 'Free, anytime',           positive: true },
  { label: 'Credit Bureau Reporting', value: 'Yes — monthly' },
  { label: 'Cooling-off Period',      value: '3 days — cancel free',   positive: true },
];

const EXPLAINERS = {
  'Interest Rate':           'This is the cost of borrowing money. For every ₹1,000 you borrow, you pay ₹15 per month.',
  'Processing Fee':          'We charge nothing to process your loan. You only pay interest on what you borrow.',
  'Cooling-off Period':      'You can cancel your loan within 3 days and pay back only the principal with no penalties.',
  'Credit Bureau Reporting': 'Your repayment history is reported to credit bureaus, which helps build your credit score.',
  'Late Payment Fee':        'If you miss a payment by more than 3 days, a fee of ₹150 is charged.',
  'Prepayment':              'You can repay early at any time — no exit fees or penalty charges.',
};

export default function KFSReviewScreen() {
  const { navigate, goBack } = useNav();
  const [agreed, setAgreed]      = useState(false);
  const [expanded, setExpanded]  = useState(null);

  return (
    <Screen className="screen-enter">
      <StatusBar />
      <NavBar variant="back-step" title="Review your terms" onBack={goBack} />

      {/* Compliance banner */}
      <div style={{
        margin: '0 20px 12px', flexShrink: 0,
        background: CZ.navyLight, borderRadius: 12,
        border: `1px solid ${CZ.navyBorder}`, padding: '10px 14px',
        display: 'flex', alignItems: 'center', gap: 10,
      }}>
        <div style={{ width: 32, height: 32, borderRadius: '50%', background: CZ.navy, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 1.5L2 4v4c0 3.6 2.6 6.1 6 7 3.4-.9 6-3.4 6-7V4L8 1.5z" fill={CZ.navyMid} opacity="0.5" />
            <path d="M8 1.5L2 4v4c0 3.6 2.6 6.1 6 7 3.4-.9 6-3.4 6-7V4L8 1.5z" stroke={CZ.navyMid} strokeWidth="1.3" />
          </svg>
        </div>
        <div>
          <div style={{ fontSize: 12.5, fontWeight: 700, color: CZ.navy, marginBottom: 1 }}>RBI-Mandated Key Fact Statement</div>
          <div style={{ fontSize: 11, color: CZ.textMd }}>[NBFC Name] · Reg. No. [XXXXX] · Tap any row for plain English</div>
        </div>
      </div>

      {/* KFS rows */}
      <div className="scroll-hidden" style={{ flex: 1, overflow: 'auto', padding: '0 20px' }}>
        <div style={{ borderRadius: 16, overflow: 'hidden', border: `1px solid ${CZ.border}`, boxShadow: CZ.shadowSm, marginBottom: 12 }}>
          {ROWS.map(({ label, value, highlight, positive }, i) => (
            <div key={i}>
              <div
                className="pressable"
                onClick={() => setExpanded(expanded === label ? null : label)}
                style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '12px 16px',
                  background: expanded === label ? CZ.navyLight : highlight ? '#F0F5FF' : CZ.card,
                  borderBottom: (i < ROWS.length - 1 || expanded === label) ? `1px solid ${CZ.border}` : 'none',
                  gap: 10, cursor: 'pointer',
                  transition: 'background 0.2s ease',
                }}
              >
                <span style={{ fontSize: 13, color: CZ.textMd, flex: 1 }}>{label}</span>
                <span style={{ fontSize: 13.5, fontWeight: 700, color: positive ? CZ.success : highlight ? CZ.navy : CZ.text, textAlign: 'right' }}>{value}</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ transform: expanded === label ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s ease', flexShrink: 0 }}>
                  <path d="M6 4l4 4-4 4" stroke={CZ.muted} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              {expanded === label && EXPLAINERS[label] && (
                <div style={{ padding: '10px 16px', background: CZ.tealSurface, borderBottom: i < ROWS.length - 1 ? `1px solid ${CZ.border}` : 'none', animation: 'czSlideUp 0.2s ease' }}>
                  <p style={{ margin: 0, fontSize: 13, color: '#0C3540', lineHeight: 1.6 }}>
                    ✦ {EXPLAINERS[label]}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        <AICard message="Tap any row to understand it in plain language. I'll explain any term you don't recognise." style={{ margin: '0 0 12px' }} />
      </div>

      {/* Consent + CTA */}
      <div style={{ padding: '8px 24px 12px', flexShrink: 0 }}>
        <div
          className="pressable"
          onClick={() => setAgreed(v => !v)}
          style={{
            display: 'flex', alignItems: 'flex-start', gap: 12,
            padding: '12px 14px', background: agreed ? CZ.navyLight : CZ.subtle,
            borderRadius: 12, border: `1px solid ${agreed ? CZ.navyBorder : CZ.border}`,
            marginBottom: 10, cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
        >
          <div style={{
            width: 20, height: 20, borderRadius: 6,
            background: agreed ? CZ.navy : 'white',
            border: `2px solid ${agreed ? CZ.navy : CZ.border}`,
            flexShrink: 0, marginTop: 1,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.2s ease',
          }}>
            {agreed && (
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                <path d="M2 5.5L4.5 8L9 3" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </div>
          <span style={{ fontSize: 13, color: CZ.text, lineHeight: 1.5 }}>
            I have read and understood the Key Fact Statement above.
          </span>
        </div>
        <Button label="I understand and agree" disabled={!agreed} onClick={() => navigate(SCREENS.CREDIT_DRAW)} />
        <HomeIndicator />
      </div>
    </Screen>
  );
}
