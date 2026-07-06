import { CZ } from '../tokens';

export default function AIBubble({ message, style }) {
  return (
    <div style={{
      margin: '0 20px',
      background: CZ.tealSurface,
      borderRadius: 24,
      padding: '9px 14px',
      display: 'flex',
      gap: 10,
      alignItems: 'center',
      border: `1px solid ${CZ.tealBorder}`,
      flexShrink: 0,
      ...style,
    }}>
      <div style={{
        width: 26, height: 26, borderRadius: '50%',
        background: CZ.aiGrad, flexShrink: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
          <path d="M5.5 1L6.8 4.3H10.5L7.6 6.3L8.6 9.7L5.5 7.7L2.4 9.7L3.4 6.3L.5 4.3H4.2L5.5 1Z" fill="white" />
        </svg>
      </div>
      <span style={{ fontSize: 12.5, color: '#0C3540', lineHeight: 1.45 }}>{message}</span>
    </div>
  );
}
