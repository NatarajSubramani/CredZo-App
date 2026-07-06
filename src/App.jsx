import { useEffect, useRef } from 'react';
import { NavigationProvider, useNav, SCREENS } from './navigation/NavigationContext';
import { CZ, SCREEN } from './tokens';

// Auth
import SignInScreen       from './screens/auth/SignInScreen';
import SignUpScreen       from './screens/auth/SignUpScreen';

// Onboarding
import WelcomeScreen      from './screens/onboarding/WelcomeScreen';
import EligibilityScreen  from './screens/onboarding/EligibilityScreen';
import OTPVerifyScreen    from './screens/onboarding/OTPVerifyScreen';
import AadhaarOTPScreen   from './screens/onboarding/AadhaarOTPScreen';
import PANCaptureScreen   from './screens/onboarding/PANCaptureScreen';
import ProcessingScreen   from './screens/onboarding/ProcessingScreen';

// Approval
import CreditLimitRevealScreen from './screens/approval/CreditLimitRevealScreen';
import KFSReviewScreen         from './screens/approval/KFSReviewScreen';
import CreditDrawScreen        from './screens/approval/CreditDrawScreen';

// Active
import RepaymentDashboard from './screens/active/RepaymentDashboard';

// Edge cases
import PartialEligibilityScreen from './screens/edge/PartialEligibilityScreen';
import FullRejectionScreen      from './screens/edge/FullRejectionScreen';

// System
import AIHelpOverlay from './screens/system/AIHelpOverlay';

function ScreenRouter() {
  const { current, overlay, direction } = useNav();
  const prevScreen = useRef(current);

  useEffect(() => {
    prevScreen.current = current;
  }, [current]);

  const animClass = direction === 'back' ? 'screen-enter-back' : 'screen-enter';

  const renderScreen = () => {
    switch (current) {
      case SCREENS.WELCOME:          return <WelcomeScreen key={current} />;
      case SCREENS.SIGN_IN:          return <SignInScreen key={current} />;
      case SCREENS.SIGN_UP:          return <SignUpScreen key={current} />;
      case SCREENS.OTP_VERIFY:       return <OTPVerifyScreen key={current} />;
      case SCREENS.ELIGIBILITY:      return <EligibilityScreen key={current} />;
      case SCREENS.AADHAAR_OTP:      return <AadhaarOTPScreen key={current} />;
      case SCREENS.PAN_CAPTURE:      return <PANCaptureScreen key={current} />;
      case SCREENS.PAN_ERROR:        return <PANCaptureScreen key={current} errorState />;
      case SCREENS.PROCESSING:
      case SCREENS.PROCESSING_DONE:  return <ProcessingScreen key={current} />;
      case SCREENS.CREDIT_REVEAL:    return <CreditLimitRevealScreen key={current} />;
      case SCREENS.KFS_REVIEW:       return <KFSReviewScreen key={current} />;
      case SCREENS.CREDIT_DRAW:      return <CreditDrawScreen key={current} />;
      case SCREENS.DASHBOARD:        return <RepaymentDashboard key={current} />;
      case SCREENS.PARTIAL_ELIGIBLE: return <PartialEligibilityScreen key={current} />;
      case SCREENS.REJECTION:        return <FullRejectionScreen key={current} />;
      default:                        return <WelcomeScreen key="fallback" />;
    }
  };

  return (
    <div style={{ position: 'relative', width: SCREEN.W, height: SCREEN.H }}>
      {renderScreen()}
      {overlay === SCREENS.AI_HELP && (
        <div style={{ position: 'absolute', inset: 0, zIndex: 50 }}>
          <AIHelpOverlay />
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <NavigationProvider>
      <div style={{
        minHeight: '100vh',
        background: CZ.heroGrad,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
      }}>
        {/* Phone frame */}
        <div style={{
          position: 'relative',
          borderRadius: 52,
          padding: 12,
          background: 'linear-gradient(145deg, #2A2A2A 0%, #1A1A1A 50%, #222 100%)',
          boxShadow: '0 0 0 1px #333, 0 32px 80px rgba(0,0,0,0.6), inset 0 0 0 1px rgba(255,255,255,0.06)',
        }}>
          {/* Notch / Dynamic Island */}
          <div style={{
            position: 'absolute',
            top: 22, left: '50%',
            transform: 'translateX(-50%)',
            width: 120, height: 34,
            background: '#111',
            borderRadius: 20,
            zIndex: 200,
            boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.06)',
          }} />

          {/* Side buttons */}
          <div style={{ position: 'absolute', left: -3, top: 100, width: 3, height: 32, background: '#444', borderRadius: '2px 0 0 2px' }} />
          <div style={{ position: 'absolute', left: -3, top: 146, width: 3, height: 56, background: '#444', borderRadius: '2px 0 0 2px' }} />
          <div style={{ position: 'absolute', left: -3, top: 214, width: 3, height: 56, background: '#444', borderRadius: '2px 0 0 2px' }} />
          <div style={{ position: 'absolute', right: -3, top: 150, width: 3, height: 80, background: '#444', borderRadius: '0 2px 2px 0' }} />

          {/* Screen area */}
          <div style={{
            borderRadius: 42,
            overflow: 'hidden',
            width: SCREEN.W,
            height: SCREEN.H,
          }}>
            <ScreenRouter />
          </div>
        </div>
      </div>
    </NavigationProvider>
  );
}
