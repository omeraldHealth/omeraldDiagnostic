import { logoIcon } from '@/utils/constants/cloudinary';
import Image from 'next/image';
import Link from 'next/link';

export default function LogoComponent() {
  return (
    <div className="flex items-center space-x-2">
      <Link href="/" className="flex items-center">
        <Image
          src={logoIcon}
          alt="Logo"
          width={70} // Adjusted width for better alignment
          height={70} // Adjusted height for better alignment
          quality={100}
          priority={true} // `priority` is a valid prop for Next.js `Image` component
        />
        <span className="ml-2 font-extrabold text-green-900 tracking-widest hidden sm:inline-block">
          OMERALD DIAGNOSTICS
        </span>
      </Link>
    </div>
  );
}
