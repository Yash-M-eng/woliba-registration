import { useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FieldBoundary } from '../ErrorBoundary';
import { updateProfile } from '../../redux/slices/registrationSlice';
import { isCompanyPasswordValid, isPhoneValid } from '../../utils/validators';

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const weekDays = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

const pad = (value) => String(value).padStart(2, '0');

const toDateValue = (year, month, day) => `${year}-${pad(month + 1)}-${pad(day)}`;

const getTodayDateValue = () => {
  const today = new Date();
  return toDateValue(today.getFullYear(), today.getMonth(), today.getDate());
};

const isFutureDateValue = (dateValue) => dateValue > getTodayDateValue();

const isDobValid = (dateValue) => Boolean(dateValue) && !isFutureDateValue(dateValue);

const toDisplayDate = (dateValue) => {
  if (!dateValue) return '';
  const [year, month, day] = dateValue.split('-');
  return `${month}/${day}/${year}`;
};

const getCalendarDays = (year, month) => {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();
  const mondayOffset = firstDay === 0 ? 6 : firstDay - 1;
  return [
    ...Array.from({ length: mondayOffset }, () => null),
    ...Array.from({ length: daysInMonth }, (_, index) => index + 1),
  ];
};

const EyeIcon = ({ visible, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    aria-label={visible ? 'Hide password' : 'Show password'}
    className="absolute right-3 top-1/2 -translate-y-1/2 text-primary cursor-pointer bg-transparent border-none p-0"
  >
    {visible ? (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ) : (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
        <line x1="1" y1="1" x2="23" y2="23" />
      </svg>
    )}
  </button>
);

const CalendarIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <path d="M16 2v4M8 2v4M3 10h18" />
  </svg>
);

const DatePickerModal = ({ value, onClose, onSelect }) => {
  const safeValue = value && !isFutureDateValue(value) ? value : '';
  const selectedDate = safeValue ? new Date(`${safeValue}T00:00:00`) : new Date(2007, 0, 1);
  const [month, setMonth] = useState(selectedDate.getMonth());
  const [year, setYear] = useState(selectedDate.getFullYear());
  const [day, setDay] = useState(safeValue ? selectedDate.getDate() : null);
  const [openPanel, setOpenPanel] = useState(null);

  const years = useMemo(() => {
    const today = new Date();
    const maxYear = today.getFullYear();
    return Array.from({ length: 90 }, (_, index) => maxYear - index);
  }, []);

  const days = getCalendarDays(year, month);
  const todayDateValue = getTodayDateValue();
  const selectedDateValue = day ? toDateValue(year, month, day) : '';

  const confirmDate = () => {
    if (!day || selectedDateValue > todayDateValue) return;
    onSelect(selectedDateValue);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/55 pt-[76px]">
      <div className="w-[270px] rounded-[8px] bg-white px-9 py-6 shadow-[0_18px_55px_rgba(0,0,0,0.2)]">
        <h3 className="mb-5 text-center text-[10px] font-semibold text-secondary">Select date</h3>

        <div className="relative mb-3 flex items-center justify-center gap-5 text-[10px] text-secondary">
          <button
            type="button"
            onClick={() => setOpenPanel(openPanel === 'month' ? null : 'month')}
            className="flex min-w-[66px] items-center justify-center gap-1 bg-transparent text-primary"
          >
            {months[month]}
            <span className="text-[8px]">⌄</span>
          </button>
          <button
            type="button"
            onClick={() => setOpenPanel(openPanel === 'year' ? null : 'year')}
            className="flex min-w-[46px] items-center justify-center gap-1 bg-transparent text-primary"
          >
            {year}
            <span className="text-[8px]">⌄</span>
          </button>

          {openPanel === 'month' && (
            <div className="absolute left-2 top-5 z-10 max-h-[118px] w-[78px] overflow-auto rounded-[3px] border border-inputBorder bg-white py-1 shadow-md">
              {months.map((monthName, index) => (
                <button
                  key={monthName}
                  type="button"
                  disabled={toDateValue(year, index, 1) > todayDateValue}
                  onClick={() => {
                    setMonth(index);
                    setDay(null);
                    setOpenPanel(null);
                  }}
                  className={`block w-full px-2 py-1 text-left text-[9px] ${
                    index === month
                      ? 'bg-primary text-white'
                      : 'bg-white text-secondary hover:bg-primary/10'
                  } disabled:cursor-not-allowed disabled:bg-white disabled:text-gray-300`}
                >
                  {monthName}
                </button>
              ))}
            </div>
          )}

          {openPanel === 'year' && (
            <div className="absolute right-6 top-5 z-10 max-h-[118px] w-[62px] overflow-auto rounded-[3px] border border-inputBorder bg-white py-1 shadow-md">
              {years.map((yearOption) => (
                <button
                  key={yearOption}
                  type="button"
                  onClick={() => {
                    setYear(yearOption);
                    if (toDateValue(yearOption, month, 1) > todayDateValue) {
                      setMonth(new Date().getMonth());
                    }
                    setDay(null);
                    setOpenPanel(null);
                  }}
                  className={`block w-full px-2 py-1 text-left text-[9px] ${yearOption === year ? 'bg-primary text-white' : 'bg-white text-secondary hover:bg-primary/10'}`}
                >
                  {yearOption}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="grid grid-cols-7 gap-y-1 text-center">
          {weekDays.map((weekDay) => (
            <span key={weekDay} className="text-[9px] text-textMuted">
              {weekDay}
            </span>
          ))}

          {days.map((calendarDay, index) => {
            const isFutureDay =
              Boolean(calendarDay) && toDateValue(year, month, calendarDay) > todayDateValue;

            return (
              <button
                key={`${calendarDay || 'blank'}-${index}`}
                type="button"
                disabled={!calendarDay || isFutureDay}
                onClick={() => setDay(calendarDay)}
                className={`mx-auto h-[19px] w-[22px] rounded-[2px] text-[9px] font-medium transition ${
                  calendarDay === day
                    ? 'bg-[#7895e3] text-white'
                    : 'bg-white text-secondary hover:bg-[#7895e3]/10'
                } disabled:pointer-events-none disabled:text-transparent`}
              >
                {calendarDay}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={confirmDate}
          disabled={!day || selectedDateValue > todayDateValue}
          className="mx-auto mt-5 block h-[29px] w-[118px] rounded-[2px] bg-primary text-[10px] font-medium text-white transition hover:bg-primaryHover disabled:bg-gray-100 disabled:text-gray-400"
        >
          Done
        </button>
      </div>
    </div>
  );
};

const Step4CompleteProfile = ({ onNext, onBack }) => {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.registration.profile);
  const [touched, setTouched] = useState({
    password: false,
    confirmPassword: false,
    dob: false,
    phone: false,
    termsAccepted: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === 'phone') {
      dispatch(updateProfile({ phone: value.replace(/\D/g, '').slice(0, 15) }));
      return;
    }

    dispatch(updateProfile({ [name]: type === 'checkbox' ? checked : value }));
  };

  const handleBlur = (e) => {
    setTouched((prev) => ({ ...prev, [e.target.name]: true }));
  };

  const passwordsDoNotMatch =
    touched.confirmPassword &&
    formData.confirmPassword !== '' &&
    formData.password !== formData.confirmPassword;

  const isFormValid =
    isCompanyPasswordValid(formData.password) &&
    formData.password === formData.confirmPassword &&
    formData.dob !== '' &&
    isDobValid(formData.dob) &&
    isPhoneValid(formData.phone) &&
    formData.termsAccepted;

  const handleDateSelect = (dateValue) => {
    if (isFutureDateValue(dateValue)) return;
    dispatch(updateProfile({ dob: dateValue }));
    setTouched((prev) => ({ ...prev, dob: true }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({
      password: true,
      confirmPassword: true,
      dob: true,
      phone: true,
      termsAccepted: true,
    });
    if (!isFormValid) return;
    onNext();
  };

  const inputBase =
    'w-full h-[32px] px-2 text-[10px] border rounded-[2px] bg-white text-secondary outline-none transition-all placeholder:text-gray-300 focus:border-inputFocus focus:ring-1 focus:ring-secondary/10';
  const inputError = 'border-primary bg-white focus:border-primary focus:ring-primary/10';
  const inputNormal = 'border-inputBorder';

  return (
    <>
      <div className="bg-white rounded-[4px] shadow-[0_8px_30px_rgba(26,43,76,0.08)] w-full max-w-[430px] px-4 py-4">
        <h2 className="registration-heading mb-5 text-center text-[24px]">
          Login Credentials
        </h2>

        <form onSubmit={handleSubmit} noValidate>
          <FieldBoundary>
            <div className="mb-2.5">
              <label className="block text-[9px] font-medium text-secondary mb-1" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  className={`${inputBase} pr-8 ${touched.password && !isCompanyPasswordValid(formData.password) ? inputError : inputNormal}`}
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <EyeIcon visible={showPassword} onClick={() => setShowPassword(!showPassword)} />
              </div>
              {touched.password && !isCompanyPasswordValid(formData.password) && (
                <p className="text-primary text-[9px] mt-1">
                  Use 8+ characters, 1 uppercase letter, and 1 number.
                </p>
              )}
            </div>
          </FieldBoundary>

          <FieldBoundary>
            <div className="mb-2.5">
              <label className="block text-[9px] font-medium text-secondary mb-1" htmlFor="confirmPassword">
                Confirm password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  className={`${inputBase} pr-8 ${passwordsDoNotMatch ? inputError : inputNormal}`}
                  placeholder="Enter password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <EyeIcon
                  visible={showConfirmPassword}
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                />
              </div>
              {passwordsDoNotMatch && (
                <p className="text-primary text-[9px] mt-1">Passwords do not match. Please re-enter.</p>
              )}
            </div>
          </FieldBoundary>

          <FieldBoundary>
            <div className="mb-2.5">
              <label className="block text-[9px] font-medium text-secondary mb-1" htmlFor="birthdayButton">
                Birthday
              </label>
              <button
                type="button"
                id="birthdayButton"
                onClick={() => setIsDatePickerOpen(true)}
                onBlur={() => setTouched((prev) => ({ ...prev, dob: true }))}
                className={`${inputBase} flex items-center justify-between text-left ${
                  touched.dob && !isDobValid(formData.dob) ? inputError : inputNormal
                } ${formData.dob ? 'text-secondary' : 'text-gray-300'}`}
              >
                <span>{toDisplayDate(formData.dob) || 'Select date of birth [MM/DD/YYYY]'}</span>
                <span className="text-primary">
                  <CalendarIcon />
                </span>
              </button>
              {touched.dob && !isDobValid(formData.dob) && (
                <p className="text-primary text-[9px] mt-1">
                  {formData.dob ? 'Birthday cannot be a future date.' : 'Birthday is required.'}
                </p>
              )}
            </div>
          </FieldBoundary>

          <FieldBoundary>
            <div className="mb-3">
              <label className="block text-[9px] font-medium text-secondary mb-1" htmlFor="phone">
                Contact number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className={`${inputBase} ${touched.phone && !isPhoneValid(formData.phone) ? inputError : inputNormal}`}
                placeholder="Enter contact number"
                value={formData.phone}
                inputMode="numeric"
                maxLength={15}
                pattern="[0-9]*"
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.phone && !isPhoneValid(formData.phone) && (
                <p className="text-primary text-[9px] mt-1">Enter a valid contact number.</p>
              )}
            </div>
          </FieldBoundary>

          <FieldBoundary>
            <div className="mb-5 flex items-center gap-2">
              <input
                type="checkbox"
                id="termsAccepted"
                name="termsAccepted"
                checked={formData.termsAccepted}
                onChange={handleChange}
                onBlur={handleBlur}
                className="h-[11px] w-[11px] rounded-sm border-inputBorder text-primary focus:ring-primary"
              />
              <label htmlFor="termsAccepted" className="text-[9px] text-secondary leading-none">
                I agree to Woliba's{' '}
                <a href="#" className="text-primary hover:underline">Terms of Service</a>
                {' '}and{' '}
                <a href="#" className="text-primary hover:underline">Privacy Policy</a>.
              </label>
            </div>
          </FieldBoundary>

          {touched.termsAccepted && !formData.termsAccepted && (
            <p className="-mt-4 mb-3 text-primary text-[9px]">Please accept the terms to continue.</p>
          )}

          <div className="flex justify-center gap-3 border-t border-gray-100 pt-4">
            <button
              type="button"
              onClick={onBack}
              className="h-[31px] w-[115px] rounded-[2px] text-[10px] font-medium border border-primary text-primary bg-white hover:bg-primary/5 transition-all"
            >
              &lt; Back
            </button>
            <button
              type="submit"
              disabled={!isFormValid}
              className="h-[31px] w-[115px] rounded-[2px] text-[10px] font-medium transition-all disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed bg-primary text-white hover:bg-primaryHover"
            >
              Next
            </button>
          </div>
        </form>
      </div>

      {isDatePickerOpen && (
        <DatePickerModal
          value={formData.dob}
          onClose={() => setIsDatePickerOpen(false)}
          onSelect={handleDateSelect}
        />
      )}
    </>
  );
};

export default Step4CompleteProfile;
