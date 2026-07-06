import { useState } from 'react';
import { CZ } from '../tokens';

export default function Button({ label, disabled, variant, onClick, style, loading }) {
  const [pressed, setPressed] = useState(false);
  const isPrimary = !variant || variant === 'primary';
  const isOutline = variant === 'outline';

  const bgColor    = disabled ? '#E2E8F5' : isPrimary ? CZ.navy : 'transparent';
  const textColor  = disabled ? CZ.muted  : isPrimary ? 'white' : CZ.navy;
  const boxShadow  = (!disabled && isPrimary) ? CZ.shadowBtn : 'none';

  return (
    <button
      onClick={!disabled && !loading ? onClick : undefined}
      onMouseDown={() => !disabled && setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      onTouchStart={() => !disabled && setPressed(true)}
      onTouchEnd={() => setPressed(false)}
      disabled={disabled}
      style={{
        width: '100%',
        height: 56,
        background: bgColor,
        color: textColor,
        border: isOutline ? `2px solid ${CZ.navy}` : 'none',
        borderRadius: 28,
        fontSize: 16,
        fontFamily: CZ.font,
        fontWeight: 700,
        cursor: disabled || loading ? 'not-allowed' : 'pointer',
        textAlign: 'center',
        boxShadow,
        letterSpacing: 0.1,
        transition: 'transform 0.12s ease, opacity 0.12s ease, box-shadow 0.15s ease',
        transform: pressed && !disabled ? 'scale(0.97)' : 'scale(1)',
        opacity: pressed && !disabled ? 0.9 : 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        ...style,
      }}
    >
      {loading ? (
        <div
          role="status"
          aria-label="Loading"
          style={{
            width: 20, height: 20, borderRadius: '50%',
            border: `2px solid ${textColor}`,
            borderTopColor: 'transparent',
            animation: 'czSpin 0.8s linear infinite',
          }}
        />
      ) : label}
    </button>
  );
}
