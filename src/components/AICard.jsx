import { CZ } from '../tokens';

export default function AICard({ message, link, style }) {
  return (
    <div style={{
      margin: '0 20px',
      background: CZ.tealSurface,
      borderRadius: 16,
      padding: '14px',
      display: 'flex',
      gap: 12,
      alignItems: 'flex-start',
      border: `1px solid ${CZ.tealBorder}`,
      flexShrink: 0,
      boxShadow: '0 2px 10px rgba(8,145,178,0.08)',
      ...style,
    }}>
      <div style={{
        width: 36, height: 36, borderRadius: '50%',
        background: CZ.aiGrad, flexShrink: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 2px 10px rgba(8,145,178,0.32)',
        border: '2px solid rgba(255,255,255,0.5)',
      }}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M7 1.5L8.7 5.5H13L9.6 7.9L10.8 12L7 9.6L3.2 12L4.4 7.9L1 5.5H5.3L7 1.5Z" fill="white" opacity="0.95" />
        </svg>
      </div>
      <div style={{ flex: 1 }}>
        <div style={{
          fontSize: 10.5, fontWeight: 700, color: CZ.teal,
          letterSpacing: 0.6, marginBottom: 4, textTransform: 'uppercase',
        }}>
          CredZo AI
        </div>
        <p style={{ margin: 0, fontSize: 13.5, color: '#0C3540', lineHeight: 1.6 }}>
          {message}
        </p>
        {link && (
          <div style={{ marginTop: 8 }}>
            <span style={{ fontSize: 13, color: CZ.teal, fontWeight: 700, cursor: 'pointer' }}>
              {link} →
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
