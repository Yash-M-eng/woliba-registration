import { useEffect } from 'react';
import loaderVideo from '../assets/Loader scrren GIF.mp4';

const Step7RegistrationLoader = ({ onComplete }) => {
  useEffect(() => {
    const timer = window.setTimeout(onComplete, 2600);
    return () => window.clearTimeout(timer);
  }, [onComplete]);

  return (
    <section className="-mt-10 flex flex-col items-center justify-center text-center">
      <video
        src={loaderVideo}
        className="h-[154px] w-[154px] object-contain"
        autoPlay
        loop
        muted
        playsInline
      />
      <p className="mt-3 text-[10px] font-semibold leading-4 text-secondary">
        Getting your wellness journey
        <br />
        ready...
      </p>

    </section>
  );
};

export default Step7RegistrationLoader;
