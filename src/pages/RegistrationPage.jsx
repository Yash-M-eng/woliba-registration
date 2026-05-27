import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { REGISTRATION_ROUTES } from '../constants/registration';
import Step1VerifyCompany from './Step1VerifyCompany';
import Step2UserDetails from './Step2UserDetails';
import Step3OtpVerification from './Step3OtpVerification';
import Step4CompleteProfile from './Step4CompleteProfile';
import Step5WellnessInterests from './Step5WellnessInterests';
import Step6WellbeingPillars from './Step6WellbeingPillars';
import Step7RegistrationLoader from './Step7RegistrationLoader';
import Step8Welcome from './Step8Welcome';

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

  if (step === 1) {
    return <Step1VerifyCompany onNext={goNext} />;
  }

  if (step === 2) {
    return <Step2UserDetails onNext={goNext} onBack={goBack} />;
  }

  if (step === 3) {
    return <Step3OtpVerification onNext={goNext} onBack={goBack} />;
  }

  if (step === 4) {
    return <Step4CompleteProfile onNext={goNext} onBack={goBack} />;
  }

  if (step === 5) {
    return <Step5WellnessInterests onNext={goNext} onBack={goBack} />;
  }

  if (step === 6) {
    return <Step6WellbeingPillars onNext={goNext} onBack={goBack} />;
  }

  if (step === 7) {
    return <Step7RegistrationLoader onComplete={goNext} />;
  }

  return <Step8Welcome />;
};

export default RegistrationPage;
