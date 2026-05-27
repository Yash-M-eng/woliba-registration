import { Outlet } from 'react-router-dom';
import backgroundImage from '../../assets/Background.png';
import logoImage from '../../assets/woliba Logo.png';

const spriteWidth = 376;

const backgroundIllustrations = [
  {
    crop: { x: 17, y: 0, width: 65, height: 42 },
    className: 'left-[3vw] top-[11vh] w-[clamp(70px,8vw,126px)]',
  },
  {
    crop: { x: 245, y: 547, width: 50, height: 54 },
    className: 'hidden left-[35vw] top-[3vh] w-[clamp(48px,5vw,84px)] sm:block',
  },
  {
    crop: { x: 0, y: 288, width: 69, height: 71 },
    className: 'hidden right-[25vw] top-[4vh] w-[clamp(92px,10vw,166px)] lg:block',
  },
  {
    crop: { x: 73, y: 536, width: 83, height: 46 },
    className: 'right-[3vw] top-[13vh] w-[clamp(94px,9vw,154px)]',
  },
  {
    crop: { x: 157, y: 23, width: 69, height: 72 },
    className: 'hidden left-[14vw] top-[34vh] w-[clamp(92px,10vw,160px)] md:block',
  },
  {
    crop: { x: 270, y: 262, width: 78, height: 79 },
    className: 'right-[10vw] top-[42vh] w-[clamp(86px,10vw,156px)]',
  },
  {
    crop: { x: 272, y: 57, width: 104, height: 76 },
    className: 'left-[7vw] bottom-[7vh] w-[clamp(102px,12vw,186px)]',
  },
  {
    crop: { x: 309, y: 422, width: 67, height: 60 },
    className: 'right-[3vw] bottom-[7vh] w-[clamp(78px,9vw,138px)]',
  },
];

const SpriteIllustration = ({ crop, className }) => (
  <span
    aria-hidden="true"
    className={`pointer-events-none absolute block overflow-hidden ${className}`}
    style={{ aspectRatio: `${crop.width} / ${crop.height}` }}
  >
    <img
      src={backgroundImage}
      alt=""
      className="absolute max-w-none select-none"
      style={{
        left: `${(-crop.x / crop.width) * 100}%`,
        top: `${(-crop.y / crop.height) * 100}%`,
        width: `${(spriteWidth / crop.width) * 100}%`,
      }}
    />
  </span>
);

const BackgroundIllustrations = () => (
  <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
    {backgroundIllustrations.map((illustration) => (
      <SpriteIllustration
        key={`${illustration.crop.x}-${illustration.crop.y}`}
        crop={illustration.crop}
        className={illustration.className}
      />
    ))}
  </div>
);

const RegistrationLayout = () => {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-[#FEFEFE]">
      <BackgroundIllustrations />

      <header className="relative z-10 flex items-start justify-between px-5 pt-6 sm:px-7 sm:pt-8 lg:px-10 lg:pt-10">
        <div className="flex h-11 w-[128px] items-center p-1.5 sm:h-14 sm:w-[164px] sm:p-2 lg:h-[72px] lg:w-[209.65px] lg:p-3">
          <img src={logoImage} alt="Woliba" className="h-full w-auto object-contain" />
        </div>
        <button className="mt-1 flex h-8 w-[104px] items-center justify-center gap-1 rounded-[2px] bg-transparent text-[9px] font-medium text-secondary sm:h-9 sm:w-[124px] lg:mt-3 lg:h-12 lg:w-[154px]">
          Language
          <img src="https://flagcdn.com/w20/us.png" alt="US" className="h-[8px] rounded-sm lg:h-[10px]" />
          En
          <span className="text-[8px] text-primary">▼</span>
        </button>
      </header>

      <main className="relative z-10 flex-1 flex justify-center items-center px-4 py-8">
        <Outlet />
      </main>

      <footer className="relative z-10 flex justify-center items-center gap-2 pb-6 text-[9px]">
        <a href="#" className="text-primary hover:underline">Terms of Use</a>
        <span className="text-primary/50">|</span>
        <a href="#" className="text-primary hover:underline">Contact Us</a>
      </footer>
    </div>
  );
};

export default RegistrationLayout;
