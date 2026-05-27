const FormCard = ({ title, children, className = '' }) => (
  <section className={`w-[min(500px,calc(100vw-32px))] translate-y-1.5 rounded-[16px] border border-[#EFEFEF] bg-[#FEFEFE] px-4 py-5 shadow-[0_0_54px_rgba(0,0,0,0.04)] ${className}`}>
    {title && (
      <h2 className="registration-heading mb-5 flex min-h-[38px] items-center justify-center text-center text-[22px]">
        {title}
      </h2>
    )}
    {children}
  </section>
);

export default FormCard;
