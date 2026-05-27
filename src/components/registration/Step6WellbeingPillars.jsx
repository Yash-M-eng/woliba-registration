import { ChevronLeft } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { WELLBEING_PILLARS } from '../../constants/registration';
import { updatePillars } from '../../redux/slices/registrationSlice';

const Step6WellbeingPillars = ({ onNext, onBack }) => {
  const dispatch = useDispatch();
  const { selected: selectedPillars } = useSelector((state) => state.registration.pillars);
  const max = 3;
  const canSubmit = selectedPillars.length === max;

  const toggle = (title) => {
    const nextSelected = selectedPillars.includes(title)
      ? selectedPillars.filter((item) => item !== title)
      : selectedPillars.length < max
        ? [...selectedPillars, title]
        : selectedPillars;

    dispatch(updatePillars({ selected: nextSelected }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!canSubmit) return;
    onNext();
  };

  return (
    <section className="relative -mt-16 w-[min(590px,calc(100vw-32px))] rounded-[4px] bg-white px-5 py-3 shadow-[0_8px_30px_rgba(26,43,76,0.08)] md:-mt-20 scale-[1.3]">
      <h1 className="registration-heading mb-3 text-center leading-[1.3] text-[24px]">
        Select any 3 wellbeing pillars goal you want to achieve
      </h1>

      <form onSubmit={handleSubmit} noValidate>
        <div className="grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-3">
          {WELLBEING_PILLARS.map((pillar) => {
            const selectionOrder = selectedPillars.indexOf(pillar.title) + 1;
            const isSelected = selectionOrder > 0;
            const disabled = !isSelected && selectedPillars.length >= max;

            return (
              <button
                key={pillar.title}
                type="button"
                onClick={() => !disabled && toggle(pillar.title)}
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
                    {pillar.title}
                  </span>
                  <span className="mt-0.5 block text-[7px] leading-[10px] text-textMuted">
                    {pillar.desc}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        <p className="mt-2 min-h-[11px] text-center text-[8px] text-primary">
          {selectedPillars.length > 0 && !canSubmit ? `Select ${max - selectedPillars.length} more.` : ''}
        </p>

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
            disabled={!canSubmit}
            className="h-[21px] w-[78px] rounded-[2px] bg-primary text-[8px] font-medium text-white transition hover:bg-primaryHover disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400"
          >
            Done
          </button>
        </div>
      </form>
    </section>
  );
};

export default Step6WellbeingPillars;
