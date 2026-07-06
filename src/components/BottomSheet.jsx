import { CZ } from '../tokens';

export default function BottomSheet({ children, style }) {
  return (
    <div style={{
      background: CZ.card,
      borderRadius: '28px 28px 0 0',
      boxShadow: '0 -8px 40px rgba(9,22,64,0.28)',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      ...style,
    }}>
      {/* Drag handle */}
      <div style={{ display: 'flex', justifyContent: 'center', padding: '12px 0 4px', flexShrink: 0 }}>
        <div style={{ width: 40, height: 4, borderRadius: 2, background: CZ.border }} />
      </div>
      {children}
    </div>
  );
}
