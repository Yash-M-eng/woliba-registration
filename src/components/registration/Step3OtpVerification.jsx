import { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FieldBoundary } from '../ErrorBoundary';
import { updateOtp } from '../../redux/slices/registrationSlice';

const Step3OtpVerification = ({ onNext, onBack }) => {
  const dispatch = useDispatch();
  const otp = useSelector((state) => state.registration.otp.value);
  const email = useSelector((state) => state.registration.user.email);
  const inputRefs = useRef([]);
  const [timeLeft, setTimeLeft] = useState(179);

  useEffect(() => {
    if (timeLeft <= 0) return undefined;
    const timerId = setInterval(() => setTimeLeft((p) => p - 1), 1000);
    return () => clearInterval(timerId);
  }, [timeLeft]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    dispatch(updateOtp({ value: newOtp }));
    if (value && index < 5) inputRefs.current[index + 1]?.focus();
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const otpValue = otp.join('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (otpValue.length === 6) onNext();
  };

  const handleResend = () => {
    dispatch(updateOtp({ value: ['', '', '', '', '', ''] }));
    setTimeLeft(179);
    inputRefs.current[0]?.focus();
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60).toString().padStart(2, '0');
    const remainingSeconds = (seconds % 60).toString().padStart(2, '0');
    return `${minutes}:${remainingSeconds}`;
  };

  return (
    <div className="bg-white rounded-[4px] shadow-[0_8px_28px_rgba(26,43,76,0.08)] w-full max-w-[280px] px-4 py-4">
      <h2 className="registration-heading mb-2 text-center text-[24px]">
        Input verification code
      </h2>
      <p className="text-textMuted text-[9px] leading-4 text-center mb-3">
        We have sent a digital OTP to your mail ID Please enter it below to Confirm.
      </p>

      <form onSubmit={handleSubmit}>
        <div className="flex justify-center gap-1.5 mb-2">
          {otp.map((digit, i) => (
            <FieldBoundary key={i} variant="inline">
              <input
                type="text"
                inputMode="numeric"
                className="w-[27px] h-[24px] text-center text-[11px] font-semibold border border-inputBorder rounded-[2px] text-secondary outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary/10"
                value={digit}
                onChange={(e) => handleChange(e, i)}
                onKeyDown={(e) => handleKeyDown(e, i)}
                ref={(el) => (inputRefs.current[i] = el)}
                maxLength={1}
              />
            </FieldBoundary>
          ))}
        </div>

        <div className="text-center mb-4 min-h-[14px]">
          {timeLeft > 0 ? (
            <span className="text-[9px] text-textMuted">
              Resend OTP in {formatTime(timeLeft)}
            </span>
          ) : (
            <button
              type="button"
              onClick={handleResend}
              className="text-[9px] text-primary font-medium hover:underline bg-transparent border-none cursor-pointer"
            >
              Resend Code
            </button>
          )}
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={onBack}
            className="flex-1 h-[25px] rounded-[2px] text-[9px] font-medium border border-primary text-primary bg-white hover:bg-primary/5 transition-all"
          >
            &lt; Back
          </button>
          <button
            type="submit"
            disabled={otpValue.length < 6}
            className="flex-1 h-[25px] rounded-[2px] text-[9px] font-medium transition-all disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed bg-primary text-white hover:bg-primaryHover"
          >
            Submit
          </button>
        </div>
      </form>

      <span className="sr-only">{email}</span>
    </div>
  );
};

export default Step3OtpVerification;
