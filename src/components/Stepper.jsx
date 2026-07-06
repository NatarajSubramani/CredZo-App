import { CZ } from '../tokens';

const STEPS = ['Eligibility', 'Verify ID', 'Your Limit'];

export default function Stepper({ active }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', padding: '0 28px 16px', flexShrink: 0 }}>
      {STEPS.map((label, i) => {
        const n = i + 1;
        const done   = n < active;
        const curr   = n === active;
        const future = n > active;
        return (
          <div key={label} style={{ display: 'flex', alignItems: 'center', flex: i < 2 ? 1 : undefined }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}>
              <div style={{
                width: 28, height: 28, borderRadius: '50%',
                background: done ? CZ.success : curr ? CZ.navy : 'transparent',
                border: `2px solid ${future ? CZ.border : done ? CZ.success : CZ.navy}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: curr ? `0 0 0 4px ${CZ.navyLight}` : 'none',
                transition: 'all 0.3s ease',
              }}>
                {done ? (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2.5 6L5 8.5L9.5 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : curr ? (
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'white' }} />
                ) : null}
              </div>
              <span style={{
                fontSize: 11,
                fontWeight: (done || curr) ? 600 : 400,
                color: future ? CZ.muted : done ? CZ.success : CZ.navy,
                whiteSpace: 'nowrap',
              }}>
                {label}
              </span>
            </div>
            {i < 2 && (
              <div style={{
                flex: 1,
                height: 2,
                background: n < active ? CZ.success : CZ.border,
                marginBottom: 22,
                marginLeft: 4,
                marginRight: 4,
                borderRadius: 1,
                transition: 'background 0.4s ease',
              }} />
            )}
          </div>
        );
      })}
    </div>
  );
}
