import { SCREEN, CZ } from '../tokens';

export default function Screen({ children, style, bg, className }) {
  return (
    <div
      role="main"
      className={`scroll-hidden ${className || ''}`}
      style={{
        width: SCREEN.W,
        height: SCREEN.H,
        background: bg || CZ.bg,
        fontFamily: CZ.font,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        position: 'relative',
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
        borderRadius: 44,
        boxShadow: '0 24px 80px rgba(0,0,0,0.45)',
        ...style,
      }}
    >
      {children}
    </div>
  );
}
