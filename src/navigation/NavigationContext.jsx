import { createContext, useContext, useState, useCallback } from 'react';

// All screen identifiers
export const SCREENS = {
  WELCOME:          'welcome',
  SIGN_IN:          'sign_in',
  SIGN_UP:          'sign_up',
  OTP_VERIFY:       'otp_verify',        // Sign-up OTP step
  ELIGIBILITY:      'eligibility',
  AADHAAR_OTP:      'aadhaar_otp',
  PAN_CAPTURE:      'pan_capture',
  PAN_ERROR:        'pan_error',
  PROCESSING:       'processing',
  PROCESSING_DONE:  'processing_done',
  CREDIT_REVEAL:    'credit_reveal',
  KFS_REVIEW:       'kfs_review',
  CREDIT_DRAW:      'credit_draw',
  DASHBOARD:        'dashboard',
  PARTIAL_ELIGIBLE: 'partial_eligible',
  REJECTION:        'rejection',
  AI_HELP:          'ai_help',
  HISTORY:          'history',
  OFFERS:           'offers',
  PROFILE:          'profile',
};

// Map each screen to a direction hint (for slide animations)
const SCREEN_ORDER = [
  SCREENS.WELCOME,
  SCREENS.SIGN_UP,
  SCREENS.SIGN_IN,
  SCREENS.OTP_VERIFY,
  SCREENS.ELIGIBILITY,
  SCREENS.AADHAAR_OTP,
  SCREENS.PAN_CAPTURE,
  SCREENS.PAN_ERROR,
  SCREENS.PROCESSING,
  SCREENS.PROCESSING_DONE,
  SCREENS.CREDIT_REVEAL,
  SCREENS.KFS_REVIEW,
  SCREENS.CREDIT_DRAW,
  SCREENS.DASHBOARD,
  SCREENS.PARTIAL_ELIGIBLE,
  SCREENS.REJECTION,
  SCREENS.AI_HELP,
];

const NavigationContext = createContext(null);

export function NavigationProvider({ children }) {
  const [current, setCurrent]     = useState(SCREENS.WELCOME);
  const [history, setHistory]     = useState([]);
  const [direction, setDirection] = useState('forward'); // 'forward' | 'back'
  const [overlay, setOverlay]     = useState(null);      // screens rendered as overlays

  const navigate = useCallback((screen, opts = {}) => {
    if (opts.overlay) {
      setOverlay(screen);
      return;
    }
    const fromIdx = SCREEN_ORDER.indexOf(current);
    const toIdx   = SCREEN_ORDER.indexOf(screen);
    setDirection(toIdx >= fromIdx ? 'forward' : 'back');
    setHistory(h => [...h, current]);
    setCurrent(screen);
  }, [current]);

  const goBack = useCallback(() => {
    if (overlay) { setOverlay(null); return; }
    if (history.length === 0) return;
    const prev = history[history.length - 1];
    setDirection('back');
    setHistory(h => h.slice(0, -1));
    setCurrent(prev);
  }, [history, overlay]);

  const dismissOverlay = useCallback(() => setOverlay(null), []);

  return (
    <NavigationContext.Provider value={{ current, navigate, goBack, overlay, dismissOverlay, direction }}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNav() {
  const ctx = useContext(NavigationContext);
  if (!ctx) throw new Error('useNav must be used within NavigationProvider');
  return ctx;
}
