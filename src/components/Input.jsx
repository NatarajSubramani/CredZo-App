import { useState, useId } from 'react';
import { CZ } from '../tokens';

export default function Input({
  label, placeholder, value, onChange,
  type = 'text', prefix, suffix, error, hint, style,
  autoComplete,
}) {
  const [focused, setFocused] = useState(false);
  const uid      = useId();
  const inputId  = `input-${uid}`;
  const errorId  = `error-${uid}`;
  const hintId   = `hint-${uid}`;

  const borderColor = error ? CZ.errorBdr : focused ? CZ.navyMid : CZ.border;

  const describedBy = [
    error ? errorId : null,
    hint && !error ? hintId : null,
  ].filter(Boolean).join(' ') || undefined;

  return (
    <div style={style}>
      {label && (
        <label
          htmlFor={inputId}
          style={{ fontSize: 13, fontWeight: 600, color: CZ.textMd, marginBottom: 6, display: 'block' }}
        >
          {label}
        </label>
      )}
      <div style={{
        display: 'flex', alignItems: 'center',
        background: CZ.card,
        border: `1.5px solid ${borderColor}`,
        borderRadius: 14,
        padding: '0 16px',
        height: 52,
        gap: 10,
        boxShadow: focused ? `0 0 0 3px ${CZ.navyLight}` : CZ.shadowSm,
        transition: 'border-color 0.18s ease, box-shadow 0.18s ease',
      }}>
        {prefix && (
          <>
            <span
              aria-hidden="true"
              style={{ fontSize: 14, fontWeight: 600, color: CZ.textMd, flexShrink: 0 }}
            >
              {prefix}
            </span>
            <div aria-hidden="true" style={{ width: 1, height: 20, background: CZ.border, flexShrink: 0 }} />
          </>
        )}
        <input
          id={inputId}
          type={type}
          value={value || ''}
          onChange={e => onChange?.(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={describedBy}
          style={{
            flex: 1,
            fontSize: 15,
            color: CZ.text,
            fontFamily: CZ.font,
            background: 'transparent',
            border: 'none',
            outline: 'none',
            padding: 0,
          }}
        />
        {suffix && (
          <span style={{ fontSize: 18, color: CZ.muted, flexShrink: 0, cursor: 'pointer' }}>
            {suffix}
          </span>
        )}
      </div>
      {hint && !error && (
        <div id={hintId} style={{ fontSize: 12, color: CZ.muted, marginTop: 5 }}>{hint}</div>
      )}
      {error && (
        <div
          id={errorId}
          role="alert"
          style={{ fontSize: 12, color: CZ.error, marginTop: 5, display: 'flex', alignItems: 'center', gap: 4 }}
        >
          <svg aria-hidden="true" width="12" height="12" viewBox="0 0 12 12" fill={CZ.error}>
            <circle cx="6" cy="6" r="5" />
            <path d="M6 3.5v3" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="6" cy="9" r=".7" fill="white" />
          </svg>
          {error}
        </div>
      )}
    </div>
  );
}
