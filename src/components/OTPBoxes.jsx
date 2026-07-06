import { useRef, useEffect } from 'react';
import { CZ } from '../tokens';

export default function OTPBoxes({ value = '', onChange, total = 6 }) {
  const inputRefs = useRef([]);

  useEffect(() => {
    const idx = Math.min(value.length, total - 1);
    inputRefs.current[idx]?.focus();
  }, []);

  const handleKeyDown = (e, idx) => {
    if (e.key === 'Backspace') {
      if (value[idx]) {
        const next = value.slice(0, idx) + value.slice(idx + 1);
        onChange?.(next);
      } else if (idx > 0) {
        inputRefs.current[idx - 1]?.focus();
        const next = value.slice(0, idx - 1) + value.slice(idx);
        onChange?.(next);
      }
    }
  };

  const handleChange = (e, idx) => {
    const ch = e.target.value.replace(/\D/g, '').slice(-1);
    if (!ch) return;
    const arr = value.split('');
    arr[idx] = ch;
    const next = arr.slice(0, total).join('');
    onChange?.(next);
    if (idx < total - 1) inputRefs.current[idx + 1]?.focus();
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, total);
    onChange?.(pasted);
    const focusIdx = Math.min(pasted.length, total - 1);
    inputRefs.current[focusIdx]?.focus();
  };

  return (
    <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
      {Array.from({ length: total }).map((_, i) => {
        const filled   = i < value.length;
        const isActive = i === value.length && i < total;
        return (
          <div key={i} style={{ position: 'relative' }}>
            <input
              ref={el => (inputRefs.current[i] = el)}
              type="tel"
              inputMode="numeric"
              maxLength={1}
              value={value[i] || ''}
              onChange={e => handleChange(e, i)}
              onKeyDown={e => handleKeyDown(e, i)}
              onPaste={handlePaste}
              aria-label={`Digit ${i + 1} of ${total}`}
              autoComplete={i === 0 ? 'one-time-code' : 'off'}
              style={{
                width: 46, height: 56,
                borderRadius: 12,
                border: `2px solid ${isActive ? CZ.navy : filled ? CZ.navyMid : CZ.border}`,
                background: (isActive || filled) ? CZ.navyLight : CZ.card,
                fontSize: 22,
                color: CZ.navy,
                fontWeight: 700,
                textAlign: 'center',
                fontFamily: CZ.font,
                outline: 'none',
                cursor: 'pointer',
                boxShadow: isActive ? `0 0 0 4px ${CZ.navyLight}` : 'none',
                transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
                caretColor: 'transparent',
              }}
            />
            {isActive && !value[i] && (
              <div style={{
                position: 'absolute',
                top: '50%', left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 2, height: 22,
                background: CZ.navy,
                borderRadius: 1,
                animation: 'czBlink 1s step-end infinite',
                pointerEvents: 'none',
              }} />
            )}
          </div>
        );
      })}
    </div>
  );
}
