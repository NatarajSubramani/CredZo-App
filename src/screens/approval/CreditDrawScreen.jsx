import { useState, useRef, useCallback } from 'react';
import { CZ } from '../../tokens';
import { Screen, StatusBar, HomeIndicator, NavBar, Card, AICard, Button } from '../../components';
import { useNav, SCREENS } from '../../navigation/NavigationContext';

const MIN = 1000;
const MAX = 35000;
const QUICK = [5000, 10000, 15000, 20000];

function formatINR(n) {
  return n.toLocaleString('en-IN');
}

export default function CreditDrawScreen() {
  const { navigate, goBack } = useNav();
  const [amount, setAmount] = useState(10000);
  const [confirming, setConfirming] = useState(false);
  const sliderRef = useRef(null);

  const interest = Math.round(amount * 0.015);
  const total    = amount + interest;
  const pct      = ((amount - MIN) / (MAX - MIN)) * 100;

  const handleSliderMove = useCallback((clientX) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    const raw = MIN + ratio * (MAX - MIN);
    const snapped = Math.round(raw / 1000) * 1000;
    setAmount(Math.max(MIN, Math.min(MAX, snapped)));
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (e.buttons !== 1) return;
    handleSliderMove(e.clientX);
  }, [handleSliderMove]);

  const handleTouchMove = useCallback((e) => {
    e.preventDefault();
    handleSliderMove(e.touches[0].clientX);
  }, [handleSliderMove]);

  const handleConfirm = () => {
    setConfirming(true);
    setTimeout(() => {
      setConfirming(false);
      navigate(SCREENS.DASHBOARD);
    }, 1800);
  };

  return (
    <Screen className="screen-enter">
      <StatusBar />
      <NavBar variant="back-step" title="Draw credit" onBack={goBack} />

      {/* Available balance */}
      <div style={{ padding: '0 20px 4px', flexShrink: 0 }}>
        <div style={{
          background: CZ.navyLight, borderRadius: 12,
          border: `1px solid ${CZ.navyBorder}`,
          padding: '8px 14px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <span style={{ fontSize: 13, color: CZ.textMd }}>Available credit</span>
          <span style={{ fontSize: 16, fontWeight: 800, color: CZ.navy }}>₹{formatINR(MAX)}</span>
        </div>
      </div>

      {/* Amount hero */}
      <div style={{ textAlign: 'center', padding: '16px 28px 4px', flexShrink: 0 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: CZ.muted, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 }}>
          Drawing amount
        </div>
        <div style={{
          fontSize: 56, fontWeight: 800, color: CZ.navy, lineHeight: 1, letterSpacing: -1.5,
          transition: 'all 0.15s ease',
        }}>
          ₹{formatINR(amount)}
        </div>
      </div>

      {/* Interactive slider */}
      <div style={{ padding: '8px 28px 4px', flexShrink: 0 }}>
        <div
          ref={sliderRef}
          style={{ position: 'relative', height: 6, background: CZ.border, borderRadius: 3, cursor: 'pointer' }}
          onMouseMove={handleMouseMove}
          onMouseDown={e => handleSliderMove(e.clientX)}
          onTouchMove={handleTouchMove}
          onTouchStart={e => handleSliderMove(e.touches[0].clientX)}
        >
          <div aria-hidden="true" style={{
            position: 'absolute', left: 0, top: 0, bottom: 0,
            width: `${pct}%`,
            background: `linear-gradient(90deg, ${CZ.teal}, ${CZ.navy})`,
            borderRadius: 3,
            transition: 'width 0.08s ease',
          }} />
          {/* Keyboard-accessible thumb */}
          <div
            role="slider"
            tabIndex={0}
            aria-label="Draw amount"
            aria-valuemin={MIN}
            aria-valuemax={MAX}
            aria-valuenow={amount}
            aria-valuetext={`₹${formatINR(amount)}`}
            onKeyDown={e => {
              const step = e.shiftKey ? 5000 : 1000;
              if (e.key === 'ArrowRight' || e.key === 'ArrowUp')
                setAmount(v => Math.min(MAX, v + step));
              else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown')
                setAmount(v => Math.max(MIN, v - step));
              else if (e.key === 'Home') setAmount(MIN);
              else if (e.key === 'End')  setAmount(MAX);
            }}
            style={{
              position: 'absolute', top: '50%',
              left: `${pct}%`,
              transform: 'translate(-50%, -50%)',
              width: 22, height: 22, borderRadius: '50%',
              background: CZ.navy, border: '3px solid white',
              boxShadow: '0 2px 10px rgba(12,30,72,0.25)',
              transition: 'left 0.08s ease',
              cursor: 'grab',
              touchAction: 'none',
              outline: 'none',
            }}
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 7 }}>
          <span style={{ fontSize: 11, color: CZ.muted }}>₹1,000</span>
          <span style={{ fontSize: 11, color: CZ.muted }}>₹35,000</span>
        </div>
      </div>

      {/* Quick-select chips */}
      <div style={{ display: 'flex', gap: 8, padding: '0 20px 10px', flexShrink: 0 }}>
        {QUICK.map(v => {
          const isActive = v === amount;
          return (
            <button
              key={v}
              type="button"
              aria-pressed={isActive}
              aria-label={`Draw ₹${v / 1000},000`}
              className="pressable"
              onClick={() => setAmount(v)}
              style={{
                flex: 1, height: 44, borderRadius: 24,
                border: `1.5px solid ${isActive ? CZ.navy : CZ.border}`,
                background: isActive ? CZ.navyLight : 'transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 13, fontWeight: isActive ? 700 : 500,
                color: isActive ? CZ.navy : CZ.textMd, cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              ₹{v / 1000}K
            </button>
          );
        })}
      </div>

      {/* Real-time cost card */}
      <div style={{ margin: '0 20px 8px', flexShrink: 0 }}>
        <Card style={{ padding: '14px 16px' }}>
          <div style={{ fontSize: 11.5, fontWeight: 700, color: CZ.muted, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 12 }}>
            What you'll pay
          </div>
          {[
            { label: 'Amount borrowed',    value: `₹${formatINR(amount)}` },
            { label: 'Interest (30 days)', value: `₹${formatINR(interest)}` },
            { label: 'Processing fee',     value: '₹0' },
          ].map(({ label, value }, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontSize: 13.5, color: CZ.textMd }}>{label}</span>
              <span style={{ fontSize: 13.5, color: CZ.text, fontWeight: 500, transition: 'all 0.15s ease' }}>{value}</span>
            </div>
          ))}
          <div style={{ height: 1, background: CZ.border, margin: '4px 0 8px' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 15, fontWeight: 700, color: CZ.text }}>Total repayment</span>
            <span style={{ fontSize: 18, fontWeight: 800, color: CZ.navy, transition: 'all 0.15s ease' }}>₹{formatINR(total)}</span>
          </div>
          <div style={{ marginTop: 6, fontSize: 11.5, color: CZ.muted }}>
            Due: 30 days from draw · Prepayment: Free anytime
          </div>
        </Card>
      </div>

      <AICard
        message={`You're drawing ₹${formatINR(amount)}. The full cost is shown above — no additional charges at repayment.`}
        style={{ marginBottom: 8 }}
      />

      <div style={{ flex: 1 }} />

      <div style={{ padding: '0 24px 12px', flexShrink: 0 }}>
        <Button
          label="Review and confirm →"
          loading={confirming}
          onClick={handleConfirm}
        />
        <HomeIndicator />
      </div>
    </Screen>
  );
}
