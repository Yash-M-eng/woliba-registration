import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ErrorBoundary from '../components/ErrorBoundary';
import RegistrationLoader from '../components/registration/RegistrationLoader';
import Step1VerifyCompany from '../components/registration/Step1VerifyCompany';
import Step2UserDetails from '../components/registration/Step2UserDetails';
import Step3OtpVerification from '../components/registration/Step3OtpVerification';
import Step4CompleteProfile from '../components/registration/Step4CompleteProfile';
import Step5WellnessInterests from '../components/registration/Step5WellnessInterests';
import Step6WellbeingPillars from '../components/registration/Step6WellbeingPillars';
import Welcome from '../components/registration/Welcome';
import { REGISTRATION_ROUTES } from '../constants/registration';

const RegistrationPage = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const routeStep = REGISTRATION_ROUTES.indexOf(pathname);
  const [fallbackStep, setFallbackStep] = useState(1);
  const step = routeStep >= 0 ? routeStep + 1 : fallbackStep;

  const goToStep = (nextStep) => {
    const safeStep = Math.min(Math.max(nextStep, 1), REGISTRATION_ROUTES.length);
    setFallbackStep(safeStep);
    navigate(REGISTRATION_ROUTES[safeStep - 1]);
  };

  const goNext = () => goToStep(step + 1);
  const goBack = () => goToStep(step - 1);

  const steps = {
    1: <Step1VerifyCompany onNext={goNext} />,
    2: <Step2UserDetails onNext={goNext} onBack={goBack} />,
    3: <Step3OtpVerification onNext={goNext} onBack={goBack} />,
    4: <Step4CompleteProfile onNext={goNext} onBack={goBack} />,
    5: <Step5WellnessInterests onNext={goNext} onBack={goBack} />,
    6: <Step6WellbeingPillars onNext={goNext} onBack={goBack} />,
    7: <RegistrationLoader onComplete={goNext} />,
    8: <Welcome />,
  };

  return (
    <ErrorBoundary variant="page" resetKeys={[step]}>
      {steps[step] || steps[8]}
    </ErrorBoundary>
  );
};

export default RegistrationPage;
