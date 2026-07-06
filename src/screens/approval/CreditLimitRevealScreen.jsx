import { useEffect, useState } from 'react';
import { CZ } from '../../tokens';
import { Screen, StatusBar, HomeIndicator, Logo, Card, AICard, Button } from '../../components';
import { useNav, SCREENS } from '../../navigation/NavigationContext';

const CONFETTI = [
  {x:28,y:14,r:5,c:CZ.teal},{x:65,y:8,r:3.5,c:'#1A4B9E'},{x:108,y:20,r:6,c:'#059669'},
  {x:158,y:6,r:3,c:'#D07A06'},{x:210,y:18,r:5,c:CZ.teal},{x:265,y:10,r:4,c:'#1A4B9E'},
  {x:312,y:22,r:5.5,c:'#059669'},{x:355,y:8,r:3.5,c:'#D07A06'},{x:44,y:44,r:3,c:'#D07A06'},
  {x:90,y:36,r:4.5,c:CZ.teal},{x:144,y:50,r:3,c:'#1A4B9E'},{x:196,y:32,r:4,c:'#059669'},
  {x:248,y:48,r:3.5,c:CZ.teal},{x:298,y:40,r:5,c:'#D07A06'},{x:344,y:44,r:3,c:'#1A4B9E'},
  {x:382,y:28,r:4.5,c:'#059669'},
];

export default function CreditLimitRevealScreen() {
  const { navigate } = useNav();
  const [shown, setShown] = useState(false);

  useEffect(() => { const id = setTimeout(() => setShown(true), 200); return () => clearTimeout(id); }, []);

  return (
    <Screen className="screen-enter">
      <StatusBar />

      {/* Top bar */}
      <div style={{ display: 'flex', alignItems: 'center', padding: '0 20px 12px', flexShrink: 0 }}>
        <Logo size="sm" />
        <div style={{ flex: 1 }} />
        <div style={{
          display: 'flex', alignItems: 'center', gap: 5,
          background: CZ.successBg, border: `1px solid ${CZ.successBdr}`,
          borderRadius: 20, padding: '5px 12px',
          fontSize: 12.5, fontWeight: 700, color: CZ.success,
          animation: shown ? 'czSuccessPop 0.5s ease both' : 'none',
        }}>
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <circle cx="6.5" cy="6.5" r="5.5" fill={CZ.success} />
            <path d="M3.5 6.5L5.5 8.5L9.5 4.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Approved!
        </div>
      </div>

      {/* Celebration */}
      <div style={{ position: 'relative', textAlign: 'center', padding: '0 28px 16px', flexShrink: 0 }}>
        <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: 64, pointerEvents: 'none' }}>
          {CONFETTI.map((d, i) => (
            <circle key={i} cx={d.x} cy={d.y} r={d.r} fill={d.c} opacity={shown ? 0.55 : 0} style={{ transition: `opacity 0.5s ease ${i * 30}ms` }} />
          ))}
        </svg>
        <div style={{ paddingTop: 14 }}>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: CZ.navy, margin: '0 0 6px', letterSpacing: -0.5, lineHeight: 1.2, animation: shown ? 'czSlideUp 0.4s ease both' : 'none' }}>
            You're approved, Arun. 🎉
          </h1>
          <p style={{ fontSize: 14.5, color: CZ.textMd, margin: 0, lineHeight: 1.5 }}>
            Your CredZo credit line is active and ready to use.
          </p>
        </div>
      </div>

      {/* Credit limit card */}
      <div style={{ margin: '0 20px 12px', flexShrink: 0 }}>
        <Card style={{ padding: '18px 20px', background: CZ.cardGrad, border: 'none' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.55)', letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: 4 }}>
                Your Credit Limit
              </div>
              <div style={{
                fontSize: 52, fontWeight: 800, color: 'white', lineHeight: 1, letterSpacing: -1,
                animation: shown ? 'czSlideUp 0.5s 0.2s ease both' : 'none',
              }}>
                ₹35,000
              </div>
            </div>
            <div style={{
              width: 44, height: 44, borderRadius: 12,
              background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <path d="M4 4H18L11 11L18 18H4L11 11L4 4Z" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 10, marginBottom: 14 }}>
            {[
              { label: 'Interest Rate', value: '1.5% / month' },
              { label: 'Valid for',     value: '12 months' },
              { label: 'Processing fee',value: '₹0' },
            ].map(({ label, value }) => (
              <div key={label} style={{ flex: 1, background: 'rgba(255,255,255,0.09)', borderRadius: 10, padding: '8px 10px', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', marginBottom: 3 }}>{label}</div>
                <div style={{ fontSize: 12.5, fontWeight: 700, color: 'white' }}>{value}</div>
              </div>
            ))}
          </div>

          <div style={{ borderTop: '1px solid rgba(255,255,255,0.12)', paddingTop: 10, textAlign: 'center', fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>
            Available from today · No annual fee · Prepayment free
          </div>
        </Card>
      </div>

      {/* Repayment preview */}
      <div style={{ margin: '0 20px 10px', flexShrink: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: CZ.textMd, marginBottom: 8 }}>If you draw ₹10,000 today:</div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ flex: 1, background: CZ.navyLight, borderRadius: '12px 0 0 12px', padding: '10px 12px', border: `1px solid ${CZ.navyBorder}`, textAlign: 'center' }}>
            <div style={{ fontSize: 10, color: CZ.muted, marginBottom: 3 }}>You receive</div>
            <div style={{ fontSize: 18, fontWeight: 800, color: CZ.navy }}>₹10,000</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0 10px' }}>
            <div style={{ height: 1, width: 20, background: CZ.border }} />
            <span style={{ fontSize: 9.5, color: CZ.muted, margin: '3px 0', whiteSpace: 'nowrap' }}>30 days</span>
            <div style={{ height: 1, width: 20, background: CZ.border }} />
          </div>
          <div style={{ flex: 1, background: CZ.subtle, borderRadius: '0 12px 12px 0', padding: '10px 12px', border: `1px solid ${CZ.border}`, textAlign: 'center' }}>
            <div style={{ fontSize: 10, color: CZ.muted, marginBottom: 3 }}>You repay</div>
            <div style={{ fontSize: 18, fontWeight: 800, color: CZ.text }}>₹10,150</div>
          </div>
        </div>
        <div style={{ fontSize: 11.5, color: CZ.muted, marginTop: 6 }}>₹150 interest · ₹0 processing fee · Prepayment free anytime</div>
      </div>

      <AICard message="No hidden charges. Everything you'll pay is shown above. Tap 'Draw credit' only when you're ready." style={{ marginBottom: 8 }} />

      <div style={{ flex: 1 }} />

      <div style={{ padding: '0 24px 12px', flexShrink: 0 }}>
        <Button label="Draw credit now →" onClick={() => navigate(SCREENS.KFS_REVIEW)} />
        <div style={{ textAlign: 'center', marginTop: 12 }}>
          <span
            className="pressable"
            onClick={() => navigate(SCREENS.DASHBOARD)}
            style={{ fontSize: 14, color: CZ.navyMid, fontWeight: 600, cursor: 'pointer' }}
          >
            Explore my dashboard first →
          </span>
        </div>
        <HomeIndicator />
      </div>
    </Screen>
  );
}
