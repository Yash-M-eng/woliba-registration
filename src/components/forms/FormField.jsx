import { FieldBoundary } from '../ErrorBoundary';

const inputBase =
  'h-[clamp(36px,4.45vh,44px)] w-full rounded-[2px] border bg-[#FEFEFE] px-4 text-[12px] text-secondary outline-none transition-all placeholder:text-gray-300 focus:border-inputFocus focus:ring-1 focus:ring-secondary/10';
const inputError = 'border-red-400 bg-red-50 focus:border-red-400 focus:ring-red-400/10';
const inputNormal = 'border-inputBorder';

const FormFieldControl = ({
  id,
  label,
  error,
  className = '',
  ...inputProps
}) => (
  <div className="mb-[clamp(12px,2.02vh,20px)]">
    <label className="mb-[clamp(4px,0.81vh,8px)] block text-[12px] font-medium text-secondary" htmlFor={id}>
      {label}
    </label>
    <input
      id={id}
      className={`${inputBase} ${error ? inputError : inputNormal} ${className}`}
      {...inputProps}
    />
    {error && <p className="mt-1.5 text-[11px] text-red-500">{error}</p>}
  </div>
);

const FormField = (props) => (
  <FieldBoundary>
    <FormFieldControl {...props} />
  </FieldBoundary>
);

export default FormField;
