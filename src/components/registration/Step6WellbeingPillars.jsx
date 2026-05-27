import { useEffect, useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateOtp,
  updatePillars,
  updateRegistrationResult,
} from '../../redux/slices/registrationSlice';
import {
  completeUserRegistration,
  getApiErrorMessage,
  getWellbeingPillars,
  sendRegistrationOtp,
} from '../../services/registrationApi';
import { showErrorToast, showSuccessToast } from '../../utils/toast';

const Step6WellbeingPillars = ({ onNext, onBack, onOtpExpired = onBack }) => {
  const dispatch = useDispatch();
  const registration = useSelector((state) => state.registration);
  const {
    selected: selectedPillars,
    options: pillarOptions,
  } = registration.pillars;
  const max = 3;
  const canSubmit = selectedPillars.length === max;
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadError, setLoadError] = useState('');
  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    if (pillarOptions.length) return;

    const loadPillars = async () => {
      setIsLoading(true);
      setLoadError('');

      try {
        const data = await getWellbeingPillars(1);
        dispatch(updatePillars({ options: Array.isArray(data) ? data : [] }));
      } catch (error) {
        const message = getApiErrorMessage(error, 'Unable to load wellbeing pillars.');
        setLoadError(message);
        showErrorToast(message);
      } finally {
        setIsLoading(false);
      }
    };

    loadPillars();
  }, [dispatch, pillarOptions.length]);

  const toggle = (id) => {
    const nextSelected = selectedPillars.includes(id)
      ? selectedPillars.filter((item) => item !== id)
      : selectedPillars.length < max
        ? [...selectedPillars, id]
        : selectedPillars;

    dispatch(updatePillars({ selected: nextSelected }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!canSubmit || isSubmitting) return;

    setSubmitError('');
    setIsSubmitting(true);

    try {
      const payload = {
        fname: registration.user.firstName,
        lname: registration.user.lastName,
        password: registration.profile.password,
        time_zone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC',
        token: registration.otp.token,
        areas_of_interest: registration.interests.selected,
        wellbeing_pillars: selectedPillars,
        accepted_privacy_policy: registration.profile.termsAccepted,
        birthday: registration.profile.dob,
        phone_number: registration.profile.phone,
        user_type: 0,
        language_id: 1,
      };

      const data = await completeUserRegistration(payload);
      dispatch(updateRegistrationResult({
        token: data?.token || '',
        user: data?.user || null,
      }));
      showSuccessToast('Registration completed successfully.');
      onNext();
    } catch (error) {
      const message = getApiErrorMessage(error, error.message || 'Registration failed.');
      const code = String(error?.response?.data?.code ?? error?.response?.data?.error_code ?? '');

      setSubmitError(message);
      showErrorToast(message);

      if (code === '-420' || code === '-431') {
        try {
          const data = await sendRegistrationOtp({ email: registration.user.email });
          dispatch(updateOtp({
            token: data?.token || '',
            value: ['', '', '', '', '', ''],
            verified: false,
          }));
          showSuccessToast('A new OTP has been sent. Please verify again.');
        } finally {
          onOtpExpired();
        }
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative -mt-16 w-[min(590px,calc(100vw-32px))] rounded-[4px] bg-white px-5 py-3 shadow-[0_8px_30px_rgba(26,43,76,0.08)] md:-mt-20 scale-[1.3]">
      <h1 className="registration-heading mb-3 text-center leading-[1.3] text-[24px]">
        Select any 3 wellbeing pillars goal you want to achieve
      </h1>

      <form onSubmit={handleSubmit} noValidate>
        <div className="grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-3">
          {isLoading && (
            <p className="col-span-full py-4 text-center text-[9px] text-textMuted">Loading pillars...</p>
          )}

          {!isLoading && loadError && (
            <p className="col-span-full py-4 text-center text-[9px] text-primary">{loadError}</p>
          )}

          {!isLoading && !loadError && pillarOptions.map((pillar) => {
            const selectionOrder = selectedPillars.indexOf(pillar.id) + 1;
            const isSelected = selectionOrder > 0;
            const disabled = !isSelected && selectedPillars.length >= max;

            return (
              <button
                key={pillar.id}
                type="button"
                onClick={() => !disabled && toggle(pillar.id)}
                className={`flex min-h-[34px] items-start gap-1.5 border-b border-gray-100 bg-white pb-1.5 text-left transition ${
                  disabled ? 'cursor-not-allowed opacity-55' : 'cursor-pointer'
                }`}
              >
                <span
                  className={`mt-0.5 flex h-[10px] w-[10px] shrink-0 items-center justify-center rounded-[2px] border text-[7px] font-semibold leading-none ${
                    isSelected
                      ? 'border-primary bg-primary text-white'
                      : 'border-gray-300 bg-white text-transparent'
                  }`}
                >
                  {selectionOrder || ''}
                </span>
                <span>
                  <span className="block text-[8px] font-semibold text-secondary md:text-[9px]">
                    {pillar.pillar_title}
                  </span>
                  <span className="mt-0.5 block text-[7px] leading-[10px] text-textMuted">
                    {pillar.description}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        <p className="mt-2 min-h-[11px] text-center text-[8px] text-primary">
          {selectedPillars.length > 0 && !canSubmit ? `Select ${max - selectedPillars.length} more.` : ''}
        </p>
        {submitError && <p className="mt-1 text-center text-[8px] text-primary">{submitError}</p>}

        <div className="mt-1 flex items-center justify-center gap-2.5">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex h-[21px] w-[78px] items-center justify-center gap-1 rounded-[2px] border border-primary bg-white text-[8px] font-medium text-primary transition hover:bg-primary/5"
          >
            <ChevronLeft className="h-2.5 w-2.5" />
            Back
          </button>
          <button
            type="submit"
            disabled={!canSubmit || isLoading || isSubmitting}
            className="h-[21px] w-[78px] rounded-[2px] bg-primary text-[8px] font-medium text-white transition hover:bg-primaryHover disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400"
          >
            {isSubmitting ? 'Saving...' : 'Done'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Step6WellbeingPillars;
