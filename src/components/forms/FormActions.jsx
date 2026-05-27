const FormActions = ({
  primaryLabel = 'Next',
  secondaryLabel,
  onSecondary,
  disabled,
}) => (
  <div className={secondaryLabel ? 'flex gap-4' : 'flex justify-center'}>
    {secondaryLabel && (
      <button
        type="button"
        onClick={onSecondary}
        className="h-[clamp(36px,4.45vh,44px)] flex-1 rounded-[2px] border border-primary bg-[#FEFEFE] text-[12px] font-medium text-primary transition-all hover:bg-primary/5"
      >
        {secondaryLabel}
      </button>
    )}
    <button
      type="submit"
      disabled={disabled}
      className={`${secondaryLabel ? 'flex-1' : 'min-w-[180px]'} h-[clamp(36px,4.45vh,44px)] rounded-[2px] bg-primary text-[12px] font-medium text-white transition-all hover:bg-primaryHover disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400`}
    >
      {primaryLabel}
    </button>
  </div>
);

export default FormActions;
