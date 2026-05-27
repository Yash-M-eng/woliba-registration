import { useSelector } from 'react-redux';
import shivaniImage from '../../assets/shivani.png';

const Welcome = () => {
  const firstName = useSelector((state) => state.registration.user.firstName);
  const displayName = firstName || 'Shivani';

  return (
    <section className="-mt-8 flex w-[min(420px,calc(100vw-32px))] flex-col items-center rounded-[4px] bg-white px-8 py-8 text-center">
      <img src={shivaniImage} alt="" className="h-[192px] w-[192px] scale-[1.5] object-contain" />

      <h1 className="registration-heading mt-3 text-center text-[26px]">
        Welcome {displayName}!
      </h1>

      <p className="mt-2 max-w-[410px] text-[11px] leading-4 text-secondary font-normal">
       Welcome to Woliba! You’ll find wellness challenges, fitness and recipe videos, and daily tips to support your health goals. Download our iOS or Android app and start your wellbeing journey today.
      </p>

      <button
        type="button"
        className="mt-4 h-[25px] min-w-[92px] rounded-[2px] bg-primary px-4 text-[9px] font-medium text-white hover:bg-primaryHover"
      >
        Let's get started
      </button>
    </section>
  );
};

export default Welcome;
