import { ChevronDown, ChevronLeft } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { WELLNESS_INTEREST_CATEGORIES } from '../constants/registration';
import { updateInterests } from '../redux/slices/registrationSlice';

const iconFor = (option) => option.slice(0, 1);

const Step5WellnessInterests = ({ onNext, onBack }) => {
  const dispatch = useDispatch();
  const { selected: selectedInterests, openCategory } = useSelector((state) => state.registration.interests);

  const toggle = (option) => {
    const nextSelected = selectedInterests.includes(option)
      ? selectedInterests.filter((item) => item !== option)
      : [...selectedInterests, option];

    dispatch(updateInterests({ selected: nextSelected }));
  };

  const setOpen = (category) => {
    dispatch(updateInterests({ openCategory: openCategory === category ? '' : category }));
  };

  const canProceed = selectedInterests.length > 0;

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!canProceed) return;
    onNext();
  };

  return (
    <section className="relative -mt-16 w-[min(670px,calc(100vw-32px))] rounded-[4px] bg-white px-4 py-3 shadow-[0_8px_30px_rgba(26,43,76,0.08)] md:-mt-20 scale-[1.3]">
      <h1 className="registration-heading leading-[1.1] mb-.5 text-center text-[24px]">
        Select all wellness interests that apply — at least one is required.
      </h1>

      <form onSubmit={handleSubmit} noValidate>
        <div className="space-y-0.5">
          {WELLNESS_INTEREST_CATEGORIES.map((category) => {
            const isOpen = openCategory === category.name;

            return (
              <div key={category.name} className="border-b border-gray-100 last:border-b-0">
                <button
                  type="button"
                  onClick={() => setOpen(category.name)}
                  className="flex h-[21px] w-full items-center justify-between bg-white text-left text-[8px] text-textMuted md:text-[9px]"
                >
                  <span>{category.name}</span>
                  <ChevronDown
                    className={`h-2.5 w-2.5 text-primary transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    strokeWidth={2.5}
                  />
                </button>

                {isOpen && (
                  <div className="flex flex-wrap gap-1.5 pb-1.5">
                    {category.options.map((option) => {
                      const active = selectedInterests.includes(option);

                      return (
                        <button
                          key={option}
                          type="button"
                          onClick={() => toggle(option)}
                          className={`flex h-[17px] items-center gap-1 rounded-full border px-2 text-[7px] font-medium transition ${
                            active
                              ? 'border-primary bg-primary text-white'
                              : 'border-gray-100 bg-white text-secondary hover:border-primary/40'
                          }`}
                        >
                          <span className={active ? 'text-white' : 'text-primary'}>{iconFor(option)}</span>
                          {option}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-3 flex items-center justify-center gap-2.5">
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
            disabled={!canProceed}
            className="h-[21px] w-[78px] rounded-[2px] bg-primary text-[8px] font-medium text-white transition hover:bg-primaryHover disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400"
          >
            Next
          </button>
        </div>
      </form>
    </section>
  );
};

export default Step5WellnessInterests;
