import { CZ } from '../tokens';

export default function Divider({ label }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <div style={{ flex: 1, height: 1, background: CZ.border }} />
      {label && (
        <>
          <span style={{ fontSize: 12, color: CZ.muted, fontWeight: 500 }}>{label}</span>
          <div style={{ flex: 1, height: 1, background: CZ.border }} />
        </>
      )}
    </div>
  );
}
