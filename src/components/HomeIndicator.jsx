import { CZ } from '../tokens';

export default function HomeIndicator({ dark }) {
  return (
    <div style={{ padding: '6px 0 10px', display: 'flex', justifyContent: 'center', flexShrink: 0 }}>
      <div style={{
        width: 134,
        height: 5,
        borderRadius: 3,
        background: dark ? 'rgba(255,255,255,0.28)' : CZ.border,
      }} />
    </div>
  );
}
