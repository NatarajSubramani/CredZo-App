import { CZ } from '../tokens';

export default function Card({ children, style }) {
  return (
    <div style={{
      background: CZ.card,
      borderRadius: 20,
      border: `1px solid ${CZ.border}`,
      boxShadow: CZ.shadowMd,
      ...style,
    }}>
      {children}
    </div>
  );
}
