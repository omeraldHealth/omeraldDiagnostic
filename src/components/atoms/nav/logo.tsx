import Link from 'next/link';

interface LogoProps {
  src: string;
  alt: string;
  width?: string;
}

const logo =
  'https://res.cloudinary.com/drjut62wv/image/upload/v1677945620/omerald/diagnosticCenter/onlyOmeraldLogo_kwbcj8.png';

const LogoImage: React.FC = () => {
  return (
    <Link href="/">
      <span className="flex justify-center">
        <Logo src={logo} alt="Omerald Diagnostics" width="70px" />
        <p className="font-sans hidden sm:block sm:text-md sm:font-bold self-center">
          OMERALD DIAGNOSTICS
        </p>
      </span>
    </Link>
  );
};

const DashboardLogo: React.FC = () => {
  return (
    <div className="pt-5 pb-4 overflow-y-auto">
      <Link href="/">
        <div className="flex items-center flex-shrink-0 px-4">
          <Logo src={logo} alt="Omerald" width="50px" />
          <span className="text-white font-semibold text-xl ml-4 tracking-wider">
            Omerald
          </span>
        </div>
      </Link>
    </div>
  );
};

const Logo: React.FC<LogoProps> = ({ src, alt, width = '50px' }) => (
  <img src={src} alt={alt} className={`w-${width} sm:w-[70px] rounded-full`} />
);

const LogoRound: React.FC<LogoProps> = ({ src, alt, width = '50px' }) => (
  <img src={src} alt={alt} className={`w-${width} sm:w-[70px] rounded-full`} />
);

export { LogoImage, DashboardLogo, Logo, LogoRound };
