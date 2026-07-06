import { CZ } from '../tokens';

export default function TrustPill({ children, variant = 'default' }) {
  const isSuccess = variant === 'success';
  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      padding: '6px 12px',
      borderRadius: 24,
      background: isSuccess ? CZ.successBg : CZ.card,
      border: `1px solid ${isSuccess ? CZ.successBdr : CZ.border}`,
      fontSize: 12,
      fontWeight: isSuccess ? 600 : 500,
      color: isSuccess ? CZ.success : CZ.textMd,
      boxShadow: isSuccess ? 'none' : CZ.shadowSm,
      whiteSpace: 'nowrap',
    }}>
      {children}
    </div>
  );
}
